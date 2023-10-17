import { Feature, Map } from "ol";
import TileLayer from "ol/layer/Tile";
import TileJSON from 'ol/source/TileJSON.js';
import View from "ol/View";
import { defaults as defaultControls } from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import { defaults as interactionDefaults } from "ol/interaction/defaults";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Point } from "ol/geom";
import { createStringXY } from "ol/coordinate";




export const createMap = (wid: number = 0, len: number = 0, zoom: number = 0) => {
  const tileLayer = new TileLayer({
    visible: true,
    source: new TileJSON({
      url: "https://api.maptiler.com/maps/basic-v2/tiles.json?key=0H0Rds7Cl3tl21zIes0M",
      tileSize: 512,
      crossOrigin: 'anonymous'
    })
  });

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    target: document.getElementById('mouse-position')!,
  });



  const map = new Map({
    target: "map",
    layers: [tileLayer],
    view: new View({
      center: fromLonLat([wid, len]),
      zoom: zoom
    }),
    controls: defaultControls().extend([mousePositionControl]),
    interactions: interactionDefaults({})
  });


  const featureOverlay = new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point(fromLonLat([35.217018, 31.771959]))
        })
      ]
    }),
    map: map,
    style: new Style({
      image: new Icon({
        anchor: [0.5, 1],
        crossOrigin: 'anonymous',
        src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
      })
    })
  });


  map.on('click', function (evt) {
    var f = map.forEachFeatureAtPixel(evt.pixel,
      function (feature) {
        return feature;
      });
    if (f) {
      const p = f as Feature<Point>
      featureOverlay.getSource()?.removeFeature(p)
      console.log(p.getGeometry()!.getCoordinates());
      return
    }
    const coordinate = toLonLat(evt.coordinate);
    console.log((coordinate));
    const feature = new Feature({
      geometry: new Point(fromLonLat(coordinate))
    })
    featureOverlay.getSource()?.addFeature(feature)
  });


  // change mouse cursor when over marker
  map.on('pointermove', function (e) {
    const pixel = map.getEventPixel(e.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    const target = map.getTarget()
    if (target && target instanceof HTMLDivElement)
      target.style.cursor = hit ? 'pointer' : '';
  });

  return map;
}
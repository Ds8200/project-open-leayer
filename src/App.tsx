import { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Map } from "ol";
import { createMap } from "./maps/maps";
import "./App.css"
import "ol/ol.css";



export default function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>(createMap(0, 0, 0));

  const len = useRef<number>(0);
  const wid = useRef<number>(0);
  const zoom = useRef<number>(0);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.innerText = ""
      map.setTarget(mapRef.current);
      map.updateSize();
    }
  }, [map]);

  const hendleSetMap = () => {
    setMap(createMap(len.current || 0, wid.current || 0, zoom.current || 0))
  }

  return (
    <>
      <Box id="header" className="center">
        <Typography className="center" sx={{ height: 60 }} variant="h4">Maps of the World</Typography>
      </Box>
      <Box className="App center">
        <Box className="map-container">
          <Box id="map" ref={mapRef}></Box>
        </Box>
        <Box className="controler-container center" sx={{ flexDirection: "column", justifyContent: "start" }}>
          <Typography variant="h4" sx={{ margin: 2 }}>Search location</Typography>
          <TextField
            sx={{ margin: "5px" }}
            type="number"
            id="longitude-input"
            label="Longitude"
            variant="outlined"
            onChange={(e) => len.current = parseFloat(e.target.value)}
          />
          <TextField
            sx={{ margin: "5px" }}
            type="number"
            id="latitude-input"
            label="Latitude"
            variant="outlined"
            onChange={(e) => wid.current = parseFloat(e.target.value)}
          />
          <TextField
            sx={{ margin: "5px" }}
            type="number"
            id="latitude-input"
            label="Zoom"
            variant="outlined"
            onChange={(e) => zoom.current = parseFloat(e.target.value)}
          />
          <Button sx={{ margin: "5px" }} variant="contained" onClick={hendleSetMap}>
            View Map
          </Button>
        </Box>
      </Box>
    </>
  );
}


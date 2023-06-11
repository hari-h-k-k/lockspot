import React,{useRef,useState} from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const BasicMap=()=>{
  // const [center,setCenter]=useState({lat:13.084622,lng:80.248357});
  // const ZOOM_LEVEL=9;

  const mapTilerAPIKey = 'TtXC8EQ9lJQX3khALmi7';

  const osm={
    maptiler:{
      url:`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${mapTilerAPIKey}`,
      attribution:'&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }
  };
  
  return(
    <>
    <MapContainer
      center={[12.97, 77.59]}
      zoom={15}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url={osm.maptiler.url}
        attribution={osm.maptiler.attribution}
      />
      <Marker position={[12.97, 77.59]}></Marker>
    </MapContainer>
    </>
  );
};

export default BasicMap;
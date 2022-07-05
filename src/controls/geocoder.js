import L from "leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";


 
L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export const Routing = ({getFilter}) => {

  
  const {LineFilter} = getFilter();
  console.log(LineFilter)
  const map = useMap();
  let PointOrigen;
  let PointDestino;

  if(LineFilter){
  const { Origen, Destino } = LineFilter.properties;
  PointOrigen = L.latLng(Origen[0],Origen[1])
  PointDestino = L.latLng(Destino[0],Destino[1])
  
  }
  console.log(PointOrigen)
  console.log(PointDestino)


  useEffect(() => {
    var geocoder = new L.Control.Geocoder.nominatim();
    if (!map) return;
    const routingControl = L.Routing.control({ 
      waypoints: [L.latLng(PointOrigen), L.latLng(PointDestino)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "green", weight: 5 }]
      },
      InputLabelProps: {
        style: { color: 'black' },
      },
      show: true, 
      addWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: false,
      geocoder: geocoder
    }).addTo(map);


    console.log(geocoder)
    
    return () => map.removeControl(routingControl);
    
  }, [map]);

  return null;
}

import React from "react";
import { LayersControl, Marker,useMap, Tooltip, LayerGroup} from "react-leaflet";
import { IconLocationWB } from "../../Icons/IconWB"

export const MarkerLayerWB = ({ data }) => {
  const leafletMap = useMap ();
  const layer = data.WB.map((Data, i) => {
    const {Latitud, Longitud} = Data;
    const {Estacion, WB_CA, Humedad} = Data;
         
    return (
      <Marker 
        key={i}
        position={[Latitud, Longitud]}
        icon={IconLocationWB}
        eventHandlers = {{
          click: (e) => leafletMap.panTo(e.latlng)
        }}
         
      >
        
        <Tooltip>
        <h3> Estacion: {Estacion} </h3>
        Calidad del aire <b>{WB_CA}</b>  <br/>
        Humedad: <b>{Humedad}</b>
        </Tooltip>
      </Marker>
    );
  });

  return (
    <LayersControl.Overlay name="Weatherbit">
       <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};

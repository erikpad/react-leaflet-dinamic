import React from "react";
import { LayersControl, Marker,useMap, Tooltip, LayerGroup} from "react-leaflet";
import { IconLocationAir } from "../../Icons/IconAir"

export const MarkerLayerAV = ({ data }) => {
  const leafletMap = useMap ();
  const layer = data.AV.map((Data, i) => {
    const {Latitud, Longitud} = Data;
    const {Estacion, Airvisual_CA, Contaminante_principal} = Data;
         
    return (
      <Marker 
        key={i}
        position={[Latitud, Longitud]}
        icon={IconLocationAir}
        eventHandlers = {{
          click: (e) => leafletMap.panTo(e.latlng)
        }}
         
      >
        
        <Tooltip>
        <h3> Estacion: {Estacion} </h3>
        Calidad del aire <b>{Airvisual_CA}</b>  <br/>
        Contaminante principal: <b>{Contaminante_principal}</b>
        </Tooltip>
      </Marker>
    );
  });

  return (
    <LayersControl.Overlay name="Airvisual">
       <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};

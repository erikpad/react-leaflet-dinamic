import React from "react";
import { LayersControl, Marker,useMap, Tooltip, LayerGroup} from "react-leaflet";
import { IconLocationWB } from "../../Icons/IconWB"

export const MarkerLayerBM = ({ data }) => {
  const leafletMap = useMap ();
  const layer = data.BM.map((Data, i) => {
    const {Latitud, Longitud} = Data;
    const {Color, BM_CA, Contaminante_principal} = Data;
         
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
        <h3> Estacion: {Color} </h3>
        Calidad del aire <b>{BM_CA}</b>  <br/>
        Contaminante principal: <b>{Contaminante_principal}</b>
        </Tooltip>
      </Marker>
    );
  });

  return (
    <LayersControl.Overlay name="Breezometer">
       <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};

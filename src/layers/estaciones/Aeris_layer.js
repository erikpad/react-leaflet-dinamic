import React from "react";
import { LayersControl, Marker,useMap, LayerGroup, Popup} from "react-leaflet";
import { IconLocationBM } from "../../Icons/IconBM"
import { Card } from "antd"

export const MarkerLayerAeris = ({ data }) => {
  const leafletMap = useMap ();
  const layer = data.aeris.map((Data, i) => {
    const {Latitud, Longitud} = Data;
    const {Estacion,CA_Aeris,O3, Contaminante_principal,CO,PM10} = Data;
         
    return (
      <Marker 
        key={i}
        position={[Latitud, Longitud]}
        icon={IconLocationBM}
        eventHandlers = {{
          click: (e) => leafletMap.panTo(e.latlng)
        }}
         
      >
        
        <Popup>
         
        <Card type="inner" title="Estacion" style={{ marginTop: 16 }}>
        <b>{Estacion}</b>
        </Card>
        <Card type="inner" title="Contaminante Principal" style={{ marginTop: 16 }}>
        <b>{Contaminante_principal}</b>
         </Card>
        <Card type="inner" title="Calidad del aire" style={{ marginTop: 16 }}>
        <b>{CA_Aeris}</b>
         </Card>
         <Card type="inner" title="Ozono" style={{ marginTop: 16 }}>
        <b>{O3}</b>
         </Card><Card type="inner" title="Dioxido de carbono" style={{ marginTop: 16 }}>
        <b>{CO}</b>
         </Card>
         <Card type="inner" title="PM10" style={{ marginTop: 16 }}>
        <b>{PM10}</b>
         </Card>
         
        </Popup>
      </Marker>
    );
  });

  return (
    <LayersControl.Overlay name="Aeris">
       <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};

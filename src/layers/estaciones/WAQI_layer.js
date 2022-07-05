import React from "react";
import { LayersControl, Marker, useMap, Popup, LayerGroup } from "react-leaflet";
import { IconLocationWAQI } from "../../Icons/IconWAQI";
import { Card} from "antd"



export const MarkerLayerWAQI = ({ data }) => {
  const leafletMap = useMap();

  const layer = data.WAQI.map((Data, i) => {
    const { Latitud, Longitud } = Data;
    const {Estacion,CA_Aeris,Temperatura, Contaminante_principal,CO,PM10,PM25,PRESION,VelocidadViento,Humedad} = Data;


    return (
      <Marker 
        key={i}
        position={[Latitud, Longitud]}
        icon={IconLocationWAQI}
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
          <Card type="inner" title="Temperatura" style={{ marginTop: 16 }}>
         <b>{Temperatura}</b>
          </Card><Card type="inner" title="dioxido de carbono" style={{ marginTop: 16 }}>
         <b>{CO}</b>
          </Card>
          <Card type="inner" title="PM10" style={{ marginTop: 16 }}>
         <b>{PM10}</b>
          </Card>
          <Card type="inner" title="PM25" style={{ marginTop: 16 }}>
         <b>{PM25}</b>
          </Card>
          <Card type="inner" title="Presion" style={{ marginTop: 16 }}>
         <b>{PRESION}</b>
          </Card>
          <Card type="inner" title="Velocidad de viento" style={{ marginTop: 16 }}>
         <b>{VelocidadViento}</b>
          </Card>
          <Card type="inner" title="Humedad" style={{ marginTop: 16 }}>
         <b>{Humedad}</b>
          </Card>
          
         </Popup>
      </Marker>

    );
  });

  return (
    <LayersControl.Overlay name="Worls Air Quality Index">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};

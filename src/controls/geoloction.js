import React, { useState, useEffect } from 'react';
import { useMap } from "react-leaflet";
import {  Marker, Popup } from "react-leaflet";
import { Card, Button, InputNumber, Space } from "antd"

import { FilterOutlined } from '@ant-design/icons';
// import { Icon, latLng } from "leaflet";
import { IconLocationWAQI } from "../Icons/IconWAQI"
import L from 'leaflet';

 export const LocationMarker = ({}) => {
  

    const map = useMap();
    const [positions, setPositions] = useState(null);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPositions(e.latlng);
        map.flyTo(e.latlng, map.getZoom());

      });
    }, [map]);

    useEffect(() => {
      // POST request using fetch inside useEffect React hook
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'React Hooks POST Request Example' })
      };
      fetch(`https://api.aerisapi.com/airquality/19.34561,-99.009381?client_id=LU5mu62XKxCHteLp3eUIY&client_secret=63JNZeitJ2hyVwlkqV0sne792XomJiSZJKeMtlNC`, requestOptions)
          .then(response => response.json())
          .then(
            (resultado) => {
              setItems(resultado.response[0].periods[0]);  
            },
            (error) => {
              setError(error);
            }
              );
        
          
          
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);


    return positions === null ? null : (
  
      <>
      <Marker position={positions} icon={IconLocationWAQI} doFitToBounds={true}>

     <Popup>
      <Card type="inner" title="Contaminante dominante" style={{ marginTop: 16 } }>
        <b>{`${items.dominant}`}</b>
      </Card>
      <Card type="inner" title="Calidad del aire" style={{ marginTop: 16 }}>
        <b>{`${items.aqi}`}</b>
      </Card>
      <Card type="inner" title="Recomendacion" style={{ marginTop: 16 , background: "#00E400"} }>
        <b>{`${items.category}`}</b>
      </Card>
        <Card type="inner" title="Selecciona la distancia" style={{ marginTop: 16 }}>
          <Space>
          
          {/* <Button
            type="primary"
            shape="round"
            icon={<FilterOutlined />}
            onClick={(e) => setRadius(e)}>
            Filtrado por metros
          </Button> */}
        </Space>
      </Card>
      </Popup>
       </Marker>
    </>
    
    );
  }
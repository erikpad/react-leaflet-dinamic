import { useState } from "react";
import L from "leaflet";
import { Marker, Popup, LayersControl, LayerGroup} from "react-leaflet"
import { defaultIcon } from "../Icons/defaultIcon"
import { Card, Button, InputNumber, Space } from "antd"
import { FilterOutlined } from '@ant-design/icons';
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"
import booleanPointOnLine from "@turf/boolean-point-on-line"
import nearestPoint from "@turf/nearest-point"
import nearestPointOnLine from "@turf/nearest-point-on-line" 
import polygonToLine from "@turf/polygon-to-line"
import explode from "@turf/explode"




const Default_radius = 50;
 
const PopupStatistics = ({ feature, setRadiusFilter }) => {
  const [radius, setRadius] = useState(Default_radius);
  const { Estacion, waqi_CA  } = feature.properties;

  return (
    <>
      
      <Card type="inner" title="Estacion" style={{ marginTop: 16 }}>
        <b>{`${Estacion}`}</b>
      </Card>
      <Card type="inner" title="Calidad del aire" style={{ marginTop: 16 }}>
        <b>{`${waqi_CA}`}</b>
      </Card>
        <Card type="inner" title="Selecciona la distancia" style={{ marginTop: 16 }}>
          <Space>
            <InputNumber
              defaultValue={Default_radius}
              min={0}
              onChange={(e) => setRadius(e)}>
            </InputNumber>

          <Button
            type="primary"
            shape="round"
            icon={<FilterOutlined />}
            onClick={() => setRadiusFilter((prevState) => {
              let newFilter;
              if (prevState) {
                if (radius === 0) {
                  newFilter = prevState
                } else {
                  const sameFeature = prevState.feature === feature;
                  const sameRadius = prevState.radius === radius;
                  if (!sameFeature || !sameRadius) {
                    newFilter = { feature, radius }
                  }
                }
              } else if (radius !== 0) {
                newFilter = { feature, radius }
              }
              return newFilter;

            })} >
            Filtrado por metros
          </Button>
        </Space>
      </Card>
    </>
  );
};

export const MarkerLayer = ({ data, setRadiusFilter, getRadiusFilter,  getLineFilter }) => {


  const radiusFilter = getRadiusFilter();
  const  LineFilter = getLineFilter();
  

  let centerPoint;
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry;
    centerPoint = L.latLng(coordinates[1], coordinates[0])
  }


    const layer = data.features.filter((currentFeature) => {
      let filterByRadius;
      let filterByLine;
      let NearPoint;
      let polygonotopunto;
      // NearPoint = nearestPointOnLine( LineFilter, currentFeature);
      
      if (centerPoint) {
        const { coordinates } = currentFeature.geometry;
        const currentPoint = L.latLng(coordinates[1], coordinates[0]);
        filterByRadius = centerPoint.distanceTo(currentPoint) / 100 < radiusFilter.radius;
        
      }
      
      if (LineFilter) {
        const { coordinates } = currentFeature.geometry;
        const currentPoint = L.latLng(coordinates[1], coordinates[0]);
         filterByLine = nearestPoint( currentPoint, LineFilter.properties.origen);
         
      }
   

      let doFilter = true;
      if( radiusFilter && LineFilter) {
        doFilter =  filterByRadius && filterByLine;
      } else if ( radiusFilter && !LineFilter ) {
        doFilter =  filterByRadius; 
      } else if ( !radiusFilter && LineFilter ) {
        doFilter =  filterByLine; 
      } 
      

      return doFilter;
    })
    .map((feature) => {
      const { coordinates } = feature.geometry;

      return (


        <Marker
          key={String(coordinates)}
          position={[coordinates[1], coordinates[0]]}
          icon={defaultIcon}
          doFitToBounds={true}>
            <Popup>
              <PopupStatistics feature={feature} setRadiusFilter={setRadiusFilter} />
            </Popup>
          </Marker>
      )
    });
    return (
    
    <LayersControl.Overlay  name="estaciones">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
    );
}
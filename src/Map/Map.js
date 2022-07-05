import { useState } from "react";
import { MapContainer, TileLayer, LayersControl, FeatureGroup } from "react-leaflet"
import { ErrorBoundary} from "../errocatch";

import { MarkerLayer } from "../layers/marker_layer"
import { RadiusFilter } from "../layers/radius_filter";
import { AlcaldiasPolygonLayer } from "../layers/cicloviaLayer";
import { CicloviasLayer } from "../layers/ciclovias_layer";
import { DraggableMarker } from "../layers/dragrabble";

import { MarkerLayerWAQI } from "../layers/estaciones/WAQI_layer";
import { MarkerLayerWB } from "../layers/estaciones/WB_layer";
import { MarkerLayerAeris } from "../layers/estaciones/Aeris_layer";
import { MarkerLayerAV } from "../layers/estaciones/AV_layer";

import { estaciones } from "../data/estaciones"
import { ciclovias } from "../data/ciclovias";

import * as WAQI from '../data/WAQI.js.json';
import * as WB from '../data/weatherbit.json';
import * as aeris from '../data/Aeris.json';
import * as AV from '../data/Airvisual.json';

import { FitBoundsToDataControl } from "../controls/fit_data_to_bounds";
import { ShowActiveFiltersControl } from "../controls/show_active_filters";
import { LocationMarker } from "../controls/geoloction";
import  Legend  from "../controls/legend";
import {Routing} from "../controls/geocoder";
// import Routing from "../controls/routing_machine_graphhopper";
import HighlightedGeoJson from "../controls/highlight"
import HighlightedlineJson from "../layers/cicloviaLayer"


export const Map = () => {
   
  const [LineFilter, setLineFilter] = useState(null);
  const getLineFilter = () => LineFilter; 

  const [radiusFilter, setRadiusFilter] = useState(null);
  const getRadiusFilter = () => radiusFilter;

  
  
    
  return (

    <MapContainer center={[19.3862, -99.1061]} zoom={13} >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM Streets" >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="ESRI World" >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution = "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"

          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Thunderforest Cycle" >
          <TileLayer
            url="https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=3907faa726ae4dd9a0ec2ac95f2e528c"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        

        <DraggableMarker/ >

        <ErrorBoundary>
        <LocationMarker />
        <Routing  getFilter={() => ({ LineFilter })}  />
        </ErrorBoundary>

        <ErrorBoundary>
        {/* <HighlightedlineJson/> */}
        {/* <HighlightedGeoJson/> */}
        <Legend />
        </ErrorBoundary>

        <ErrorBoundary>
        <MarkerLayer
          data={estaciones}
          setRadiusFilter={setRadiusFilter}
          getRadiusFilter={getRadiusFilter}
          getLineFilter={getLineFilter} />
        </ErrorBoundary>

        <RadiusFilter
          radiusFilter={radiusFilter}
          setRadiusFilter={setRadiusFilter} />


        <CicloviasLayer 
          data={ciclovias}
          setLineFilter={setLineFilter}
          getLineFilter={getLineFilter}/>

     {/* Layers de Estaciones climatologicas  */}
     <ErrorBoundary>
        <MarkerLayerWAQI data={WAQI}/> 
        <MarkerLayerWB data={WB}/>
        <MarkerLayerAeris data={aeris}/>
        <MarkerLayerAV data={AV}/>
      </ErrorBoundary>

      </LayersControl>

      <FitBoundsToDataControl/>

      <ErrorBoundary>
      <ShowActiveFiltersControl
       getFilters={() => ({ radiusFilter, LineFilter })} />
      </ErrorBoundary>

    </MapContainer>

  );
};


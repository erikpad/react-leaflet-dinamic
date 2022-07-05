import { List } from "antd";
// import {PostRequestHooks} from "./calidadenruta";

export const ShowActiveFiltersControl = ({ getFilters }) => {
  const { radiusFilter, LineFilter } = getFilters();

  const getDisplayFilters = () => {
    const filtersToDisplay = [];

    const round = (num) => Math.round(num * 100) / 100;
   

    if(LineFilter) {
      const { Origen, Destino,Distancia, Calidad } = LineFilter.properties;
      const LineFilterToDisplay = ` 
      Origen:  ${round(Origen[0])}, ${round(Origen[1])}) 
      Destino: ${round(Destino[0])}, ${round(Destino[1])}) 
      Calidad de aire: ${round(Calidad)}
      Distancia: ${round(Distancia)} km 

      `;
      filtersToDisplay.push(LineFilterToDisplay); 
    }

    

    if (radiusFilter) {
      const { coordinates } = radiusFilter.feature.geometry;
      const { radius } = radiusFilter;
      const {waqi_CA} = radiusFilter.feature.properties;
      const radiusFilterToDisplay = `
          Center: (Lat: ${round(coordinates[1])}, Lon: ${round(coordinates[0])})
          Radius: ${radius} m 
          Calidad del aire: ${waqi_CA}
          ` ;         
      filtersToDisplay.push(radiusFilterToDisplay);
    }

    return filtersToDisplay.length > 0
      ? filtersToDisplay
      : ["No Filter Active"];
  };

  const RenderActiveFilters = () => {
    return (
      <List
        size="large"
        header={
          <div>
            <b>Active Filters</b>
          </div>
        }
        bordered
        dataSource={getDisplayFilters()}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    );
  };

  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control leaflet-bar leaflet-control-layers">
        <RenderActiveFilters />
        <div name="airvisual_widget" key="62bd048095a1bfb1fe3fc55f"></div>
        <script type="text/javascript" src="https://widget.iqair.com/script/widget_v3.0.js"></script>
      </div>
    </div>
  );
};

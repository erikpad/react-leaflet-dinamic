import { GeoJSON } from "react-leaflet";
import { LayersControl} from "react-leaflet"

export const CicloviasLayer = ({data, setLineFilter, getLineFilter}) => {
   const LineFilter = getLineFilter();
  
      console.log(LineFilter)
   
    const layer = <GeoJSON 
        key= 'geo-json-layer' 
        data={data}
        weight={4}
        eventHandlers={{
            click: (e) => setLineFilter((prevState) =>{
            const same = prevState === e.propagatedFrom.feature;
            return same ? null : e.propagatedFrom.feature;
            }),
        }}
        style = {(feature) => {
            return {
                color: LineFilter ===  feature ? "red" : "#6FA1EC"
            }
        }}
        >
          
        </GeoJSON>
   
    return (
        <LayersControl.Overlay checked name="Ciclovias">
          {layer}
        </LayersControl.Overlay>
        );
}
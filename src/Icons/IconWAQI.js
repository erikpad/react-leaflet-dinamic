import L from 'leaflet'
import icon from '../images/icon2.svg';

export const IconLocationWAQI = L.icon({
    iconUrl: icon,
    iconSize: [35, 35],
    iconAnchor: [13.5, 17.5],
    popupAnchor: [0, -11]
});
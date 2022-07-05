import L from 'leaflet'
import icon from '../images/icon3.svg';

export const IconLocationAir = L.icon({
    iconUrl: icon,
    iconSize: [35, 35],
    iconAnchor: [13.5, 17.5],
    popupAnchor: [0, -11]
});
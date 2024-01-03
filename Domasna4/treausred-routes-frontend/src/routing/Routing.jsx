import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import "../styles.css"

L.Marker.prototype.options.icon = L.icon({
    iconUrl: require('../resources/location-pin.png'),
    iconSize: [38, 38]
});

export default function Routing({ isVisible, routeSites }) {
    const map = useMap();

    useEffect(() => {
        console.log(`Navigate: ${routeSites}`);
        if (!map || !isVisible) return;
        const waypoints = routeSites.map(site => L.latLng(site.lat, site.lon));



        const routingControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: true,

        }).addTo(map);

        const container = routingControl._container;

        container.style.position = 'fixed';
        container.style.bottom = '10px';
        container.style.left = '10px';

        return () => map.removeControl(routingControl);
    }, [map, isVisible, routeSites]);

    return null;
}
import {MapContainer, Marker, TileLayer, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import './Home.css';
import {useEffect, useState} from "react";
import {Icon} from "leaflet/dist/leaflet-src.esm";
import MarkerClusterGroup from "react-leaflet-cluster";
import {Routes, Route, useNavigate} from "react-router-dom";
import './Home.css';
const Archaeological = () => {

    const navigate = useNavigate()

    const [state, setState] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/archaeologicalSites')
            .then(response => response.json())
            .then(data => {
                setState(data);
            })
    }, []);

    const customIcon = new Icon({
        iconUrl: require('./resources/location-pin.png'),
        iconSize: [38, 38]
    })

    const navigateHome = () => {
        navigate('/Home');
    }

    const navigateMuseums = () => {
        navigate('/Museums');
    }

    const navigateArchaeologicalSites = () => {
        navigate('');
    }

    const navigateMonasteries = () => {
        navigate('/Monasteries');
    }

    return(

        <MapContainer center={[41.9981, 21.4254]} zoom={15}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <div id="nav">
                <button onClick={navigateHome}>All</button>
                <button onClick={navigateMuseums}>Museums</button>
                <button onClick={navigateArchaeologicalSites}>Archaeological Sites</button>
                <button onClick={navigateMonasteries}>Monasteries</button>
            </div>

            <MarkerClusterGroup chunkedLoading>
                {state.map(obj =>
                    <Marker position={[obj.lat, obj.lon]} icon={customIcon}>
                        <Popup><h2>{obj.name}</h2></Popup>
                    </Marker>
                )}
            </MarkerClusterGroup>



        </MapContainer>
    )
}

export default Archaeological
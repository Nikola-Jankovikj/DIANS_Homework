import {MapContainer, Marker, TileLayer, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import {useEffect, useState} from "react";
import {Icon} from "leaflet/dist/leaflet-src.esm";
import MarkerClusterGroup from "react-leaflet-cluster";
import './MapComponent.css';

const Home = () => {

    const [url, setUrl] = useState('http://localhost:8080/api/all')
    const [state, setState] = useState([]);

    useEffect(() => {
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setState(data);
            })
    }, [url]);

    const customIcon = new Icon({
        iconUrl: require('./resources/location-pin.png'),
        iconSize: [38, 38]
    })

    const findAll = () => {
        setUrl('http://localhost:8080/api/all')
    }

    const findMuseums = () => {
        setUrl('http://localhost:8080/api/museums')
    }

    const findArchaeologicalSites = () => {
        setUrl('http://localhost:8080/api/archaeologicalSites')
    }

    const findMonasteries = () => {
        setUrl('http://localhost:8080/api/monasteries')
    }

    return(

        <MapContainer center={[41.9981, 21.4254]} zoom={15}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <div id="nav">
                <button onClick={findAll}>All</button>
                <button onClick={findMuseums}>Museums</button>
                <button onClick={findArchaeologicalSites}>Archaeological Sites</button>
                <button onClick={findMonasteries}>Monasteries</button>
            </div>

            <MarkerClusterGroup chunkedLoading>
                {state.map(obj =>
                    <Marker key={obj.id} position={[obj.lat, obj.lon]} icon={customIcon}>
                        <Popup><h2>{obj.name}</h2></Popup>
                    </Marker>
                )}
            </MarkerClusterGroup>

        </MapContainer>
    )
}

export default Home
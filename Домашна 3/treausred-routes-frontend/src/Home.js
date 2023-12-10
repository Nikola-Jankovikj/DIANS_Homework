import {MapContainer, Marker, TileLayer, Popup, ZoomControl, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import {useEffect, useRef, useState} from "react";
import {Icon} from "leaflet/dist/leaflet-src.esm";
import MarkerClusterGroup from "react-leaflet-cluster";
import './MapComponent.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './Search.css'
import MapPanAndZoomController from "./MapPanAndZoomController";
import NavComponent from "./NavComponent";
import SearchComponent from "./SearchComponent";


const Home = () => {

    const customIcon = new Icon({
        iconUrl: require('./resources/location-pin.png'),
        iconSize: [38, 38]
    })

    const controllerRef = useRef()

    const initialCenter = [41.6090, 21.7453]
    const initialZoom = 9

    const [url, setUrl] = useState('http://localhost:8080/api/all')
    const [state, setState] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setState(data);
            })
    }, [url]);

    const updateMapViaNavButtons = (selectedFilter) => {
        setUrl(selectedFilter)
        controllerRef.current.resetMapFocus(initialCenter, initialZoom)
    }

    const updateMapViaSearch = (selectedQuery) => {
        setUrl(selectedQuery)
    }

    const focusTarget = (coordinates) => {
        controllerRef.current.focusTarget(coordinates)
    }

    const focusMap = (coordinates) => {
        controllerRef.current.focusMap(coordinates)
    }


    return(

        <MapContainer center={initialCenter} zoom={initialZoom} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapPanAndZoomController ref={controllerRef}/>

            <div id={"top-bar"}>
                <div id="search-bar">
                    <SearchComponent updateMarkers={updateMapViaSearch}
                                     focusTarget={focusTarget}
                                     focusMap={focusMap}
                                     initialCenter={initialCenter}/>
                </div>


                <div id="nav">
                    <NavComponent updateMarkers={updateMapViaNavButtons}/>
                </div>

                <Dropdown id="profile-icon">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <img src="/images/user.png" alt="Profile Image"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="dropdown-menu">
                        <Dropdown.Item href="/favorites">Favorites</Dropdown.Item>
                        <Dropdown.Item href="/profile">Account</Dropdown.Item>
                        <Dropdown.Item href="/login">Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <MarkerClusterGroup chunkedLoading>
                {state.map(obj =>
                    <Marker key={obj.id} position={[obj.lat, obj.lon]} icon={customIcon}>
                        <Popup>
                            <div className="card">
                                <h2 className="cardTitle">{obj.name}</h2>
                                <section className="cardFt">
                                    <div className="favorite">&#9825;</div>
                                    <div className="rating">
                                        &#9733; &#9733; &#9733; &#9733; &#9734;
                                    </div>
                                </section>
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MarkerClusterGroup>

            <ZoomControl position="bottomright" />

        </MapContainer>
    )
}

export default Home
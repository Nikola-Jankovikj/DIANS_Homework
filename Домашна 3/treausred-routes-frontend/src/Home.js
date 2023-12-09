import {MapContainer, Marker, TileLayer, Popup, ZoomControl, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import {useEffect, useRef, useState} from "react";
import {Icon} from "leaflet/dist/leaflet-src.esm";
import MarkerClusterGroup from "react-leaflet-cluster";
import './MapComponent.css';
import {useNavigate} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import './Search.css'
import MapPanAndZoomController from "./MapPanAndZoomController";


const Home = () => {

    const customIcon = new Icon({
        iconUrl: require('./resources/location-pin.png'),
        iconSize: [38, 38]
    })

    const controllerRef = useRef()

    const initialCenter = [41.6090, 21.7453]
    const initialZoom = 9
    // var mapCenter = initialCenter
    // var mapZoom = initialZoom

    var objsForFocus = []

    const setObjsForFocus = (data) => {
        objsForFocus = data
    }

    const navigate = useNavigate()

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

    const navigateProfile = () => {
        navigate("/profile")
    }

    const findAll = () => {
        setUrl('http://localhost:8080/api/all')
        controllerRef.current.resetMapFocus(initialCenter, initialZoom)
    }

    const findMuseums = () => {
        setUrl('http://localhost:8080/api/museums')
        controllerRef.current.resetMapFocus(initialCenter, initialZoom)
    }

    const findArchaeologicalSites = () => {
        setUrl('http://localhost:8080/api/archaeologicalSites')
        controllerRef.current.resetMapFocus(initialCenter, initialZoom)
    }

    const findMonasteries = () => {
        setUrl('http://localhost:8080/api/monasteries')
        controllerRef.current.resetMapFocus(initialCenter, initialZoom)
    }

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const updateQuery = (event) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/search?query=${query}`)
            .then(response => response.json())
            .then(suggestions => {
                console.log(suggestions)
                setSuggestions(suggestions);
            })
    }, [query]);


    const selectSuggestion = (element) => {
        setQuery(element.name)
    }

    const onSearch = async (searchTerm) => {

        const fetchData = async () => {
            setUrl(`http://localhost:8080/api/search?query=${searchTerm}`);
            await fetch(`http://localhost:8080/api/search?query=${searchTerm}`)
                .then(data => data.json())
                .then(data => {
                    setObjsForFocus(data)
                })
        }

        await fetchData()
        console.log('MAJKATA KRAJOT: ' + objsForFocus)
        //setUrl(`http://localhost:8080/api/search?query=${searchTerm}`);
        var coordinates = calculateNewCenter(objsForFocus)
        console.log('BEFORE CONTROLLER ' + coordinates)
        if(coordinates.length === 1){
            controllerRef.current.focusTarget(coordinates[0])
        }
        else{
            var boundingBox = getBoundingBox(coordinates)
            console.log("BOUNDING BOX" + boundingBox)
            controllerRef.current.focusMap(boundingBox)
        }
    }

    function getBoundingBox(coordinates) {
        if (coordinates.length === 0) {
            return null; // No coordinates provided
        }

        // Initialize min and max values
        let minLat = coordinates[0][0];
        let maxLat = coordinates[0][0];
        let minLon = coordinates[0][1];
        let maxLon = coordinates[0][1];

        // Iterate through the coordinates to find min and max values
        for (const [lat, lon] of coordinates) {
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
            minLon = Math.min(minLon, lon);
            maxLon = Math.max(maxLon, lon);
        }

        // Return the two corners of the bounding box as [[minLat, minLon], [maxLat, maxLon]]
        return [
            [minLat, minLon],
            [maxLat, maxLon]
        ];
    }

    const calculateNewCenter = (objs) => {
        if (objs.length === 0){
            return [initialCenter]
        }

        if(objs.length === 1){
            console.log(typeof parseFloat(objs[0].lat))
            console.log(`INSIDE 1: LAT: ${objs[0].lat} AND LON: ${objs[0].lon}`)
            return [[parseFloat(objs[0].lat), parseFloat(objs[0].lon)]]
        }


        const latitutes = objs.map((el) => parseFloat(el.lat))
        const longitutes = objs.map((el) => parseFloat(el.lon))
        console.log('MOST IMPORTANT LAT: ' + latitutes + '\n LON: ' + longitutes)

       //const latLonArray = latitutes.flatMap((lat, index) => [lat, longitutes[index]]);
        const latLonArray = latitutes.map((lat, index) => [lat, longitutes[index]])
        console.log('INSIDE FUNC ' + latLonArray)
       return latLonArray
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
                        <input type="text" value={query} onChange={updateQuery} placeholder="Search..." />
                        <button onClick={() => onSearch(query)}>Search</button>
                        <div className={"suggestions-dropdown"}>
                            {suggestions.filter((suggestion) => {
                                const search = query.toLowerCase()
                                return search !== '' && suggestion.name.toLowerCase() !== search
                            }).map((element) => (<div onClick={() => selectSuggestion(element)} className="dropdown-item">{element.name}</div>))}
                        </div>
                    </div>


                    <div id="nav">
                        <button onClick={findAll}>All</button>
                        <button onClick={findMuseums}>Museums</button>
                        <button onClick={findArchaeologicalSites}>Archaeological Sites</button>
                        <button onClick={findMonasteries}>Monasteries</button>
                    </div>
                {/*<div id="profile-icon" onClick={navigateProfile}>*/}
                {/*    <img src="/images/user.png" alt="Favorites Image"/>*/}
                {/*</div>*/}

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
                            {/*<h2>{obj.name}</h2>*/}
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
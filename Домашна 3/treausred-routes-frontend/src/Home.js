import {MapContainer, Marker, TileLayer, Popup, ZoomControl} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import {useEffect, useState} from "react";
import {Icon} from "leaflet/dist/leaflet-src.esm";
import MarkerClusterGroup from "react-leaflet-cluster";
import './MapComponent.css';
import {useNavigate} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import './Search.css'


const Home = () => {

    const initialCenter = [41.6090, 21.7453]
    var mapCenter = initialCenter

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

    const customIcon = new Icon({
        iconUrl: require('./resources/location-pin.png'),
        iconSize: [38, 38]
    })

    const navigateProfile = () => {
        navigate("/profile")
    }

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

    const onSearch = (searchTerm) => {
        setUrl(`http://localhost:8080/api/search?query=${searchTerm}`);
        mapCenter = calculateNewCenter()
        console.log(mapCenter)
    }

    const calculateNewCenter = () => {
        if (state.length === 0){
            return initialCenter
        }

        if(state.length === 1){
            console.log(`INSIDE 1: LAT: ${state.lat} AND LON: ${state.lon}`)
            return [state[0].lat, state[0].lon]
        }

        const latitutes = state.map((el) => el.lat).reduce((left, right) => left + right, 0);
        const longitutes = state.map((el) => el.lon).reduce((left, right) => left + right, 0);

        console.log(latitutes)
        console.log(longitutes)

        const avgLat = latitutes / state.length
        const avgLon = longitutes / state.length

        return [avgLat, avgLon]
    }

    return(

        <MapContainer center={mapCenter} zoom={9} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <div id={"top-bar"}>
                <div id={"search-and-filter"}>
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
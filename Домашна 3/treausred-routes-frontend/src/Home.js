import { MapContainer, Marker, TileLayer, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { Icon } from "leaflet/dist/leaflet-src.esm";
import MarkerClusterGroup from "react-leaflet-cluster";
import './MapComponent.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './Search.css';
import MapPanAndZoomController from "./MapPanAndZoomController";
import NavComponent from "./NavComponent";
import SearchComponent from "./SearchComponent";



const Home = () => {
    const customIcon = new Icon({
        iconUrl: require('./resources/location-pin.png'),
        iconSize: [38, 38]
    });

    const controllerRef = useRef();
    const initialCenter = [41.6090, 21.7453];
    const initialZoom = 9;

    const [url, setUrl] = useState('http://localhost:8080/api/all');
    const [state, setState] = useState([]);
    const [favoritedStates, setFavoritedStates] = useState([]);
    const [favorites, setFavorites] = useState([]);


    const fetchFavorites = () => {
        fetch('http://localhost:8080/favorites/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setFavorites(data))
            .catch(error => console.error('Error fetching favorites:', error));
    };

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setState(data);
                setFavoritedStates(data.map(obj => obj.isFavorited || false));
            })
    }, [url]);

    useEffect(() => {
        fetchFavorites();
    }, []);  // Run this effect only once on mount

    useEffect(() => {
        setFavoritedStates(Array(state.length).fill(false));
        state.forEach((obj, index) => {
            if (favorites.some(favorite => favorite.id === obj.id)) {
                setFavoritedStates(prevStates => {
                    const newStates = [...prevStates];
                    newStates[index] = true;
                    return newStates;
                });
            }
        });
    }, [favorites, state]);

    const updateMapViaNavButtons = (selectedFilter) => {
        setUrl(selectedFilter);
        controllerRef.current.resetMapFocus(initialCenter, initialZoom);
    };

    const updateMapViaSearch = (selectedQuery) => {
        setUrl(selectedQuery);
    };

    const focusTarget = (coordinates) => {
        controllerRef.current.focusTarget(coordinates);
    };

    const focusMap = (coordinates) => {
        controllerRef.current.focusMap(coordinates);
    };

    const handleToggleFavorite = async (objectId) => {
        try {
            const isCurrentlyFavorited = favoritedStates[state.findIndex(obj => obj.id === objectId)];
            const response = await fetch('http://localhost:8080/favorites', {
                method: isCurrentlyFavorited ? 'DELETE' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ objectId }),
            });

            if (response.ok) {
                setFavoritedStates(prevStates => {
                    const newStates = [...prevStates];
                    const index = state.findIndex(obj => obj.id === objectId);
                    newStates[index] = !newStates[index];
                    return newStates;
                });
            } else {
                console.error('Failed to toggle favorites');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <MapContainer center={initialCenter} zoom={initialZoom} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapPanAndZoomController ref={controllerRef} />

            <div id={"top-bar"}>
                <div id="search-bar">
                    <SearchComponent updateMarkers={updateMapViaSearch}
                                     focusTarget={focusTarget}
                                     focusMap={focusMap}
                                     initialCenter={initialCenter} />
                </div>

                <div id="nav">
                    <NavComponent updateMarkers={updateMapViaNavButtons} />
                </div>

                <Dropdown id="profile-icon">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <img src="/images/user.png" alt="Profile Image" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="dropdown-menu">
                        <Dropdown.Item href="/favorites">Favorites</Dropdown.Item>
                        <Dropdown.Item href="/profile">Account</Dropdown.Item>
                        <Dropdown.Item href="/login">Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <MarkerClusterGroup chunkedLoading>
                {state.map((obj, index) =>
                    <Marker key={obj.id} position={[obj.lat, obj.lon]} icon={customIcon}>
                        <Popup>
                            <div className="card">
                                <h2 className="cardTitle">{obj.name}</h2>
                                <section className="cardFt">
                                    <button className="heartButton" onClick={() => handleToggleFavorite(obj.id, index)}>
                                        {favoritedStates[index] ? '️🤍' : '♡'}
                                    </button>
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
    );
};

export default Home;

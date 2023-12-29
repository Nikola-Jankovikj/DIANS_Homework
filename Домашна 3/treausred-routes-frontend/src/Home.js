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
import ProfileDropdown from "./ProfileDropdown";
import RoutePlannerSidebar from './RoutePlannerSidebar';
import Routing from "./Routing"; // Import the ProfileDropdown component
import "./styles.css";
import "leaflet/dist/leaflet.css";

const customIcon = new Icon({
    iconUrl: require('./resources/location-pin.png'),
    iconSize: [38, 38]
});

const Home = () => {

    const routePlannerSidebarRef = useRef();

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [routeSites, setRouteSites] = useState([]);
    const openSidebar = async () => {

        const myLocation = await fetch('http://localhost:8080/api/0')
        setRouteSites((prevSites) => [...prevSites, myLocation]);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }

        async function success (position)  {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        }

        function error() {
            console.log("Unable to retrieve your location");
        }



        console.log('Button clicked. Opening sidebar...');

        setSidebarOpen(true);
    };

    const handleAddToRoute = async (site) => {
        try {
            // Send a POST request to the backend to add the site to the route
            const response = await fetch('http://localhost:8080/route/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ siteId: site.id }), // Pass the site ID to the backend
            });

            if (response.ok) {
                console.log(`Site ${site.name} added to the route on the backend.`);
                // Update the routeSites state if needed
                setRouteSites((prevSites) => [...prevSites, site]);
            } else {
                console.error('Failed to add site to the route on the backend.');
            }
        } catch (error) {
            console.error('Error adding site to the route:', error);
        }
    };

    const handleRemoveFromRoute = (index) => {
        console.log("NOVOTO DODADENO CONSOLE LOG" + index)
        setRouteSites((prevSites) => prevSites.filter((_, i) => i !== index));
    };


    const closeSidebar = () => {
        console.log('Button clicked. Closing sidebar...');

        setSidebarOpen(false);
    };



    const controllerRef = useRef();
    const initialCenter = [41.6090, 21.7453];
    const initialZoom = 9;

    const [url, setUrl] = useState('http://localhost:8080/api/all');
    const [state, setState] = useState([]);
    const [favoritedStates, setFavoritedStates] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const [userRatings, setUserRatings] = useState({});
    const [averageRatings, setAverageRatings] = useState({});


    const fetchFavorites = () => {
        fetch('http://localhost:8080/favorites/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include", // Include cookies in the reques
        })
            .then(response => response.json())
            .then(data => setFavorites(data))
            .catch(error => console.log("error"));
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
        setFavoritedStates(prevStates => {
            const newStates = Array(state.length).fill(false);
            state.forEach((obj, index) => {
                if (favorites.some(favorite => favorite.id === obj.id)) {
                    newStates[index] = true;
                }
            });
            return newStates;
        });
    }, [state]);

    const [selectedLocations, setSelectedLocations] = useState([]);

    const fetchPopupDetails = async (objectId) => {
        await fetchUserRatings(objectId)
        await fetchAverageRatings(objectId)
    }

    const fetchUserRatings = async (objectId) => {
        const userRatingData = await fetch(`http://localhost:8080/reviews/userRating/${objectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include", // Include cookies in the reques
        });
        const userRating = await userRatingData.json();
        setUserRatings(prevRatings => ({
            ...prevRatings,
            [objectId]: userRating,
        }));

    }

    const fetchAverageRatings = async (objectId) => {
        const avgRatingData = await fetch(`http://localhost:8080/reviews/rating/${objectId}`);
        const avgRating = await avgRatingData.json();
        setAverageRatings(prevAvgRatings => ({
            ...prevAvgRatings,
            [objectId]: avgRating,
        }));
    }

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

    const addToRoute = (locationName) => {
        setSelectedLocations((prevSelectedLocations) => [...prevSelectedLocations, locationName]);
    };

    const handleToggleFavorite = async (objectId, locationName) => {
        try {
            const isCurrentlyFavorited = favoritedStates[state.findIndex(obj => obj.id === objectId)];
            const response = await fetch('http://localhost:8080/favorites', {
                method: isCurrentlyFavorited ? 'DELETE' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include", // Include cookies in the request
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

    const handleStarClick = async (objectId, rating) => {
        try {
            const response = await fetch(`http://localhost:8080/reviews/${objectId}/${rating}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include", // Include cookies in the request
            });

            if (response.ok) {
                // Update user ratings
                setUserRatings(prevRatings => ({
                    ...prevRatings,
                    [objectId]: rating,
                }));

                // Fetch and update average ratings
                const avgRatingResponse = await fetch(`http://localhost:8080/reviews/rating/${objectId}`);
                const avgRating = await avgRatingResponse.json();

                setAverageRatings(prevAvgRatings => ({
                    ...prevAvgRatings,
                    [objectId]: avgRating,
                }));
            } else {
                console.error('Failed to add review');
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

                <ProfileDropdown /> {/* Use the ProfileDropdown component */}
            </div>

            <div id="plan-route-button">
                <button onClick={openSidebar}>My Route</button>
                {isSidebarOpen && (
                    <RoutePlannerSidebar
                        onClose={closeSidebar}
                        addToRoute={handleAddToRoute}
                        routeSites={routeSites}
                        removeFromRoute={handleRemoveFromRoute}
                        updateRouteSites={handleAddToRoute}
                    />
                )}
            </div>

            <MarkerClusterGroup chunkedLoading>
                {state.map((obj, index) => (
                    <Marker key={obj.id} position={[obj.lat, obj.lon]} icon={customIcon} eventHandlers={{popupopen: () => fetchPopupDetails(obj.id)}}>
                        <Popup>
                            <div className="card">
                                <h2 className="cardTitle">{obj.name}</h2>
                                <section className="cardFt">
                                    <button
                                        id="heart"
                                        className="heartButton"
                                        onClick={() => handleToggleFavorite(obj.id, index)}
                                    >
                                        {favoritedStates[index] ? '🤍️' : '♡'}
                                    </button>
                                    <div className="rating">
                                        {[1, 2, 3, 4, 5].map((starId) => (
                                            <span
                                                id="stars"
                                                key={starId}
                                                onClick={() => handleStarClick(obj.id, starId)}
                                            >
                                            {userRatings[obj.id] >= starId ? '★' : '☆'}
                                             </span>
                                        ))}
                                        <span className="averageRating">
                                        Average: {averageRatings[obj.id] && ` ${averageRatings[obj.id].toFixed(1)}`}
                                         </span>
                                    </div>
                                    <button onClick={() => handleAddToRoute(obj)}>
                                        + Add to Route
                                    </button>
                                </section>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>

            <ZoomControl position="bottomright" />

        </MapContainer>


    );
};

export default Home;
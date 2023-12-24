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
import ProfileDropdown from "./ProfileDropdown"; // Import the ProfileDropdown component




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


    useEffect(() => {
        const fetchUserRatings = async () => {
            try {
                const objects = state.map(obj => obj.id);
                const userRatingsData = await Promise.all(
                    objects.map(async objectId => {
                        const userRatingData = await fetch(`http://localhost:8080/reviews/userRating/${objectId}`);
                        const userRating = await userRatingData.json();
                        return { objectId, userRating };
                    })
                );

                const userRatingsMap = {};
                userRatingsData.forEach(item => {
                    userRatingsMap[item.objectId] = item.userRating;
                });

                setUserRatings(userRatingsMap);
            } catch (error) {
                console.error('Error fetching user ratings:', error);
            }
        };

        const fetchAverageRatings = async () => {
            try {
                const objects = state.map(obj => obj.id);
                const averageRatingsData = await Promise.all(
                    objects.map(async objectId => {
                        const avgRatingData = await fetch(`http://localhost:8080/reviews/rating/${objectId}`);
                        const avgRating = await avgRatingData.json();
                        return { objectId, avgRating };
                    })
                );

                const averageRatingsMap = {};
                averageRatingsData.forEach(item => {
                    averageRatingsMap[item.objectId] = item.avgRating;
                });

                setAverageRatings(averageRatingsMap);
            } catch (error) {
                console.error('Error fetching average ratings:', error);
            }
        };

        // Fetch user ratings and average ratings
        fetchUserRatings();
        fetchAverageRatings();
    }, [state]); // Fetch ratings whenever the state changes


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

            <MarkerClusterGroup chunkedLoading>
                {state.map((obj, index) => (
                    <Marker key={obj.id} position={[obj.lat, obj.lon]} icon={customIcon}>
                        <Popup>
                            <div className="card">
                                <h2 className="cardTitle">{obj.name}</h2>
                                <section className="cardFt">
                                    <button id="heart" className="heartButton" onClick={() => handleToggleFavorite(obj.id, index)}>
                                        {favoritedStates[index] ? '🤍️' : '♡'}
                                    </button>
                                    <div className="rating">
                                        {[1, 2, 3, 4, 5].map((starId) => (
                                            <span id="stars"
                                                key={starId}
                                                onClick={() => handleStarClick(obj.id, starId)}
                                            >
                                                {userRatings[obj.id] >= starId ? '★' : '☆'}
                                            </span>
                                        ))}
                                        <span className="averageRating">
                                            Average:
                                            {averageRatings[obj.id] && ` ${averageRatings[obj.id].toFixed(1)}`}
                                         </span>
                                    </div>
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
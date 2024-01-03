import { MapContainer, Marker, TileLayer, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import { Icon } from "leaflet/dist/leaflet-src.esm";
import MarkerClusterGroup from "react-leaflet-cluster";
import './map/MapComponent.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './search/Search.css';
import MapPanAndZoomController from "./map/MapPanAndZoomController";
import NavComponent from "./search/NavComponent";
import SearchComponent from "./search/SearchComponent";
import ProfileDropdown from "./profile/ProfileDropdown";
import RoutePlannerSidebar from './routing/RoutePlannerSidebar';
import Routing from "./routing/Routing"; // Import the ProfileDropdown component
import "./styles.css";
import "leaflet/dist/leaflet.css";
import PopupCard from "./map/PopupCard";

export const StateContext = createContext();
export const RouteContext = createContext();

const Home = () => {
    const customIcon = new Icon({
        iconUrl: require('./resources/location-pin.png'),
        iconSize: [38, 38]
    });

    const [reload, setReload] = useState(false);

    const handleReload = () => {
        // Toggle the reload state to force a re-render
        setReload((prevReload) => !prevReload);
        console.log("RELOADED?")
    };

    const routePlannerSidebarRef = useRef();

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [routeSites, setRouteSites] = useState([]);
    const [userLocation, setUserLocation] = useState([])
    const openSidebar = () => {
        console.log('Button clicked. Opening sidebar...');
        setSidebarOpen(true);
        handleReload()
    };

    const handleAddToRoute = async (site) => {
        setRouteSites((prevSites) => [...prevSites, site])
        console.log("ROUTE SITES ARE: " + routeSites)
        handleReload()
    };

    const handleRemoveFromRoute = (index) => {
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

    const [userRatings, setUserRatings] = useState({});
    const [averageRatings, setAverageRatings] = useState({});

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setState(data);
                //setFavoritedStates(data.map(obj => obj.isFavorited || false));
            })
    }, [url]);

    useEffect(() => {
        const fetchUserRatings = async () => {
            try {
                const objects = state.map(obj => obj.id);
                const userRatingsData = await Promise.all(
                    objects.map(async objectId => {
                        const userRatingData = await fetch(`http://localhost:8080/reviews/userRating/${objectId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: "include", // Include cookies in the reques
                        });
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

                <StateContext.Provider value={state}>
                    <ProfileDropdown />
                </StateContext.Provider>


            </div>


                <div id="plan-route-button">
                    <button onClick={openSidebar}>My Route</button>
                    {isSidebarOpen && (
                        <RouteContext.Provider value={{routeSites, setRouteSites}}>
                            <RoutePlannerSidebar
                                onClose={closeSidebar}
                                handleAddToRoute={handleAddToRoute}
                                // routeSites={routeSites}
                                removeFromRoute={handleRemoveFromRoute}
                                // updateRouteSites={handleAddToRoute}
                                // updateRouteSites={setRouteSites}
                                reload={reload}
                                userLocation={userLocation}
                                setUserLocation={setUserLocation}
                            />
                        </RouteContext.Provider>
                    )}
                </div>


            <MarkerClusterGroup chunkedLoading>
                {state.map((obj, index) => (
                    <Marker key={obj.id} position={[obj.lat, obj.lon]} icon={customIcon}>
                        <Popup>
                            <StateContext.Provider value={state}>
                                <PopupCard obj={obj}
                                           index={index}
                                           setAverageRatings={setAverageRatings}
                                           setRouteSites={setRouteSites}
                                           handleAddToRoute={handleAddToRoute}
                                />
                            </StateContext.Provider>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>

            <ZoomControl position="bottomright" />

        </MapContainer>

    );
};

export default Home;
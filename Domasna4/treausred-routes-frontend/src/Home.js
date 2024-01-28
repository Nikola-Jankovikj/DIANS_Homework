import { MapContainer, Marker, TileLayer, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, {createContext, useEffect, useRef, useState} from "react";
import { Icon } from "leaflet/dist/leaflet-src.esm";
import MarkerClusterGroup from "react-leaflet-cluster";
import './map/MapComponent.css';
import './search/Search.css';
import MapPanAndZoomController from "./map/MapPanAndZoomController";
import NavComponent from "./search/NavComponent";
import SearchComponent from "./search/SearchComponent";
import ProfileDropdown from "./profile/ProfileDropdown";
import RoutePlannerSidebar from './routing/RoutePlannerSidebar';
import "./styles.css";
import "leaflet/dist/leaflet.css";
import PopupCard from "./map/PopupCard";
import {useNavigate} from "react-router-dom";

export const StateContext = createContext();
export const RouteContext = createContext();

const Home = () => {
    const customIcon = new Icon({
        iconUrl: require('./resources/location-pin.png'),
        iconSize: [38, 38]
    });

    const navigate = useNavigate()

    const [reload, setReload] = useState(false);

    const handleReload = () => {
        setReload((prevReload) => !prevReload);
    };

    const routePlannerSidebarRef = useRef();

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [routeSites, setRouteSites] = useState([]);
    const [userLocation, setUserLocation] = useState([])
    const openSidebar = () => {
        setSidebarOpen(true);
        handleReload()
    };

    const handleAddToRoute = async (site) => {
        if(!routeSites.includes(site)){
            setRouteSites((prevSites) => [...prevSites, site])
            setSidebarOpen(true)
            handleReload()
        }
    };

    const handleRemoveFromRoute = (index) => {
        setRouteSites((prevSites) => prevSites.filter((_, i) => i !== index));
    };


    const closeSidebar = () => {
        setSidebarOpen(false);
    };


    const controllerRef = useRef();
    const initialCenter = [41.6090, 21.7453];
    const initialZoom = 9;

    const [url, setUrl] = useState('https://graceful-yoke.railway.internal/element-service/api/all');
    const [state, setState] = useState([]);

    const [userRatings, setUserRatings] = useState({});
    const [averageRatings, setAverageRatings] = useState({});

    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setState(data);
            })
            .catch(() => navigate("/login"))
    }, [url]);

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
                    <div id="plan-route-button">
                        <button onClick={openSidebar}>My Route</button>
                        {isSidebarOpen && (
                            <RouteContext.Provider value={{routeSites, setRouteSites}}>
                                <RoutePlannerSidebar
                                    onClose={closeSidebar}
                                    handleAddToRoute={handleAddToRoute}
                                    removeFromRoute={handleRemoveFromRoute}
                                    reload={reload}
                                    userLocation={userLocation}
                                    setUserLocation={setUserLocation}
                                />
                            </RouteContext.Provider>
                        )}
                    </div>
                </div>

                <div id="nav">
                    <NavComponent updateMarkers={updateMapViaNavButtons} />
                </div>

                <StateContext.Provider value={state}>
                    <ProfileDropdown />
                </StateContext.Provider>
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
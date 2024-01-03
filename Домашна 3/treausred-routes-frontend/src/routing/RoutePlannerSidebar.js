import React, {useContext, useEffect, useState} from 'react';
import './RoutePlannerSidebar.css';
import Routing from './Routing';
import {getUserLocation} from "../utils/routing_utils";
import {RouteContext, UserLocationContext} from "../Home";

const RoutePlannerSidebar = ({ onClose, handleAddToRoute, setUserLocation, reload }) => {

    const {routeSites, setRouteSites} = useContext(RouteContext)

    const [isRoutingVisible, setIsRoutingVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const addUserLocationToRoute = (location) => {
        let userObj = {id: "0", name: "user", type: "user", lat: location[0].toString(), lon: location[1].toString()}
        setRouteSites((prevSites) => [userObj, ...prevSites])
    }

    const findMe = async () => {
        if (routeSites.length === 0 || routeSites[0].name !== 'user') {
            setIsLoading(true)
            try{
                const location = await getUserLocation()
                await addUserLocationToRoute(location)
                await setUserLocation(location)
                setIsLoading(false)
            } catch (error){
                console.log("Error in findMe:", error)
                setIsLoading(false)
            }
        }
    };

    const handleDeleteSite = async (siteId) => {
        setRouteSites((prevSites) => prevSites.filter((site) => site.id !== siteId));
    };

    const handleToggleRouting = () => {
        setIsRoutingVisible(!isRoutingVisible);
    };

    useEffect(() => {
        setIsLoading(false);
    }, [])

    useEffect(() => {
        // Add any additional logic you want to execute when routeSites changes
        console.log('Route sites updated:', routeSites);
    }, [handleAddToRoute]);


    return (
        <div className="route-planner-sidebar">
            <h2>Your Route</h2>
            <p className="route-instructions">
                Welcome to Your Route Planner. Please click on the desired sites and utilize the '+ Add to Route' option to include them in your meticulously optimized route. Our advanced system strategically arranges the selected sites to ensure an efficient and enjoyable journey. Thank you for choosing our route planning service.
            </p>
            <ul className="site-list">
                {isLoading ? (
                    <div className="loader"></div>
                ) : routeSites[0] !== null ? (
                    routeSites.map((site, index) => (
                        <li key={site.id} className={`site-list-item ${index === 0 ? 'starting-location' : ''}`}>
                            <span className="site-name">{index === 0 ? 'Starting Location: ' : ''}{site.name}</span>
                            <button className="delete-button" onClick={() => handleDeleteSite(site.id)}>
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No sites in the route.</p>
                )}
            </ul>
            <button onClick={findMe}>Find Me</button>
            <button onClick={onClose}>Close</button>
            <button onClick={handleToggleRouting}>
                {isRoutingVisible ? 'Hide Routing' : 'Show Routing'}
            </button>
            <p className="show-route-text" style={{ fontSize: 'larger' }}>
                When clicked, the map will display (or hide) your route.
            </p>
            <Routing isVisible={isRoutingVisible} routeSites={routeSites} />
        </div>
    );
};

export default RoutePlannerSidebar;
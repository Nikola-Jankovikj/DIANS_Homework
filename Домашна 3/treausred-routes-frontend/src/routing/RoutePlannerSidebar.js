import React, { useEffect, useState } from 'react';
import './RoutePlannerSidebar.css';
import Routing from './Routing';
import {getUserLocation} from "../utils/routing_utils";

const RoutePlannerSidebar = ({ onClose, removeFromRoute, updateRouteSites, handleAddToRoute }) => {
    const [routeSites, setRouteSites] = useState([]);
    const [isRoutingVisible, setIsRoutingVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleDeleteSite = async (siteId) => {
        try {
            const response = await fetch(`http://localhost:8080/route/delete/${siteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(`Site with ID ${siteId} deleted from the route on the backend.`);
                setRouteSites((prevSites) => prevSites.filter((site) => site.id !== siteId));
            } else {
                console.error(`Failed to delete site with ID ${siteId} from the route on the backend.`);
            }
        } catch (error) {
            console.error('Error deleting site from the route:', error);
        }
    };

    const handleToggleRouting = () => {
        setIsRoutingVisible(!isRoutingVisible);
    };

    useEffect(() => {
        const fetchRouteSites = async () => {
            try {
                console.log('Fetching route sites...');
                const response = await fetch('http://localhost:8080/route/all');

                if (!response.ok) {
                    // Handle non-successful response (e.g., 404 Not Found)
                    throw new Error(`Failed to fetch route sites (HTTP ${response.status})`);
                }

                getUserLocation()
                    .then((coordinates) => {
                        console.log("User location:", coordinates);
                        finalData.push()
                    })
                    .catch((error) => {
                        console.error("Error getting user location:", error);
                    });

                const data = await response.json();
                setRouteSites(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching route sites:', error);
                setIsLoading(false);
                // Handle the error state here (e.g., display an error message to the user)
            }
        };

        // Fetch data when the component mounts
        fetchRouteSites();
    }, [updateRouteSites]);
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
                    <p>Loading...</p>
                ) : routeSites.at(0) !== null ? (
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
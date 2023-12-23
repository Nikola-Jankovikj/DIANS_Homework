import React, {useEffect, useState} from 'react';
import './RoutePlannerSidebar.css';
import Routing from "./Routing";

const RoutePlannerSidebar = ({ onClose, removeFromRoute, updateRouteSites, handleAddToRoute }) => {

    const [routeSites, setRouteSites] = useState([]);
    const [isRoutingVisible, setIsRoutingVisible] = useState(false);
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
                console.log("ej")
                const response = await fetch('http://localhost:8080/route/all');
                const data = await response.json();
                setRouteSites(data);
            } catch (error) {
                console.error('Error fetching route sites:', error);
            }
        };

        fetchRouteSites();
    }, [updateRouteSites]);

    useEffect(() => {
        // Add any additional logic you want to execute when routeSites changes
        console.log('Route sites updated:', routeSites);
    }, [handleAddToRoute]);



        // ...


    return (
        <div className="route-planner-sidebar">
            <h2>Your Route</h2>
            <ul className="site-list">
                {routeSites.map((site, index) => (
                    <li key={index} className="site-list-item">
                        <span className="site-name">{site.name}</span>
                        <button
                            className="delete-button"
                            onClick={() => handleDeleteSite(site.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
            <button onClick={handleToggleRouting}>
                {isRoutingVisible ? 'Hide Routing' : 'Show Routing'}
            </button>
            <Routing isVisible={isRoutingVisible} routeSites={routeSites} />
        </div>
    );
};

export default RoutePlannerSidebar;

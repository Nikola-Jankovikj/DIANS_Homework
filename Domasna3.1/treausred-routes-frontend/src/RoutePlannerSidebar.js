import React, { useState } from 'react';
import './RoutePlannerSidebar.css';

const RoutePlannerSidebar = ({ onClose, routeSites, removeFromRoute }) => {
    const handleDeleteSite = (index) => {
        // Logic to remove location from the route in the Home component
        removeFromRoute(index);
    };

    return (
        <div className="route-planner-sidebar">
            <h2>Plan a Route</h2>
            <ul className="site-list">
                {routeSites.map((site, index) => (
                    <li key={index} className="site-list-item">
                        <span className="site-name">{site.name}</span>
                        <button
                            className="delete-button"
                            onClick={() => handleDeleteSite(index)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default RoutePlannerSidebar;

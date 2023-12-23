// ProfileDropdown.js
import React, { useState } from 'react';
import './MapComponent.css';
const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="profile-icon">
            <div id="dropdown-basic">
                <img src="/images/user.png" alt="Profile Image" onClick={toggleDropdown} />

            </div>

            {isOpen && (
                <div id="dropdown-menu">
                    <a className="dropdown-item" href="/favorites">Favorites</a>
                    <a className="dropdown-item" href="/profile">Account</a>
                    <a className="dropdown-item" href="/login">Log out</a>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

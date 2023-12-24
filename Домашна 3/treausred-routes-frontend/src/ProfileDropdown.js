// ProfileDropdown.js
import React, { useState } from 'react';
import './MapComponent.css';
import {useNavigate} from "react-router-dom";

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const navigateLogin = () => {
        console.log('Navigate to login');
        navigate("/login");
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // May need to include additional headers, such as authentication tokens
                },
            });

            if (response.ok) {
                // Logout successful, navigate to the login page
                navigateLogin();
            } else {
                // Handle logout failure, e.g., display an error message
                console.error('Logout failed');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred during logout:', error);
        }
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
                    <button
                        className="dropdown-item"
                        style={{ backgroundColor: 'whitesmoke' }}
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

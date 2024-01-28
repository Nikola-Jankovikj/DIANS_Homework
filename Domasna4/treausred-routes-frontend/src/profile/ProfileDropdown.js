import '../map/MapComponent.css';
import React, {useContext, useEffect, useState} from 'react';
import { useNavigate} from "react-router-dom";
import {StateContext} from "../Home";
const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const state  = useContext(StateContext);
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [profilePicture, setProfilePicture] = useState("");

    const handleLogout = async () => {
        try {
            const response = await fetch("https://graceful-yoke.railway.internal/authUser-service/auth/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                credentials: "include",
            });
            if (response.ok) {
                localStorage.removeItem("jwtToken")
                navigate("/login")
            } else {
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

   const navigateFavorites = () => {
       navigate('/favorites', {state})
   }

   const navigateAccount = () => {
       navigate('/profile')
   }

    return (
        <div id="profile-icon">
            <div id="dropdown-basic">
                {profilePicture ? (
                    <img src={profilePicture} alt="Profile Image" onClick={toggleDropdown}/>
                ) : (
                    <img src="/images/user.png" alt="Default Profile Image" onClick={toggleDropdown}/>
                )}
                <div id="profile-icon-acc">

                </div>
            </div>

            {isOpen && (
                <div id="dropdown-menu">
                    {localStorage.getItem('jwtToken') ? (
                        <>
                            <button className="dropdown-item1" onClick={navigateFavorites}>Favorites</button>
                            <button className="dropdown-item1" onClick={navigateAccount}>Account</button>
                            <button className="dropdown-item" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <button className="dropdown-item" onClick={() => navigate("/login")}>
                            Log in
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

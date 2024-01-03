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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/profile", {
                    method: "GET",
                    headers: {
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfilePicture(data["profile-picture"]);
                } else {
                    console.error("Error fetching user email");
                }
            } catch (error) {
                console.error("Error fetching user email", error);
            }
        };

        fetchUserData();
    }, []);
    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies in the request
            });

            if (response.ok) {
                // Successfully logged out
                const data = await response.json();
                console.log(data); // Log the response from the server
                navigate("/login")
                // You can redirect to the login page or handle it based on your app's flow
            } else {
                // Handle logout failure
                const errorData = await response.json();
                console.error(errorData); // Log the error from the server
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

   const navigateFavorites = () => {
       console.log(state)
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
                    <button className="dropdown-item1" onClick={navigateFavorites}>Favorites</button>
                    <button className="dropdown-item1" onClick={navigateAccount}>Account</button>
                    <button className="dropdown-item" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

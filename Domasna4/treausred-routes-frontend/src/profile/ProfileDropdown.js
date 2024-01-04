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
                const response = await fetch("http://localhost:9000/authUser-service/user/profile", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
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
            const response = await fetch("http://localhost:9000/authUser-service/auth/logout", {
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

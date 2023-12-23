// ProfileDropdown.js
import React, {useEffect, useState} from 'react';
import './MapComponent.css';
const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                    <a className="dropdown-item" href="/favorites">Favorites</a>
                    <a className="dropdown-item" href="/profile">Account</a>
                    <a className="dropdown-item" href="/login">Log out</a>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

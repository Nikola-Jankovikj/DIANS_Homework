import './MapComponent.css';
import React, {useEffect, useState} from 'react';
import { useNavigate} from "react-router-dom";
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

    const navigate = useNavigate()
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
                    <button className="dropdown-item" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

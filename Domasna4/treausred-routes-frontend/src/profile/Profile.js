import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/home");
    };

    const navigateToChangePassword = () => {
        navigate("/change-password");
    };

    const [email, setEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await fetch("http://localhost:9000/authUser-service/user/profile", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmail(data.email);
                    setProfilePicture(data["profile-picture"]);
                } else {
                    console.error("!!!Error fetching user email");
                    navigate("/login")
                }
            } catch (error) {
                console.error("Error fetching user email", error);
            }
        };

        fetchUserEmail();
    }, []);

    const handleChangeEmail = async () => {
        try {
            const response = await fetch(`http://localhost:9000/authUser-service/user/changemail/${newEmail}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFeedbackMessage("Email changed successfully");
                setEmail(data.newEmail);
                setNewEmail("");
                setIsSuccess(true);
                navigate("/login")
            } else {
                const errorData = await response.json();
                setFeedbackMessage(`${errorData.error}`);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Error changing email", error);
            setFeedbackMessage(`Error changing email`);
            setIsSuccess(false);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <button className="back-button" onClick={navigateHome}>
                    {" "}
                    &#x21D0;{" "}
                </button>
                <h1>ACCOUNT SETTINGS</h1>
            </div>
            <section id="settings">
                <div className="row">
                    <div id="profile-icon-acc">
                        {profilePicture ? (
                            <img src={profilePicture} alt="Profile Image"/>
                        ) : (
                            <img src="/images/user.png" alt="Default Profile Image"/>
                        )}
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        readOnly
                    />
                    <div>
                        <input
                            type="email"
                            placeholder="Enter new email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button onClick={handleChangeEmail}>Change Your E-mail Address</button>
                    </div>
                </div>
                <div className="row">
                    <button onClick={navigateToChangePassword}>Change Your Password</button>
                </div>
                <div className={`row feedback ${isSuccess ? "success" : "error"}`}>
                    <p className={isSuccess ? "success" : "error"}>{feedbackMessage}</p>
                </div>
            </section>
        </div>
    );
};

export default Profile;

import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import ChangePasswordForm from "./ChangePasswordForm";

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/profile", {
                    method: "GET",
                    headers: {

                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmail(data.email);
                    setProfilePicture(data["profile-picture"]);
                } else {
                    console.error("Error fetching user email");
                }
            } catch (error) {
                console.error("Error fetching user email", error);
            }
        };

        fetchUserEmail();
    }, []);

    const handleChangeEmail = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/changemail/${newEmail}`, {
                method: "PUT",
                headers: {

                },
            });

            if (response.ok) {
                const data = await response.json();
                setFeedbackMessage("Email changed successfully");
                setEmail(data.newEmail);
                setNewEmail("");
                setIsSuccess(true);
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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUploadProfilePicture = async (event) => {
        try {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("http://localhost:8080/user/upload-profile-picture", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);
                setFeedbackMessage("Profile picture uploaded successfully");
                setIsSuccess(true);
            } else {
                const errorData = await response.text();
                setFeedbackMessage(`${errorData}`);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Error uploading profile picture", error);
            setFeedbackMessage("Error uploading profile picture");
            setIsSuccess(false);
        } finally {
            handleCloseModal();
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
                    <button onClick={handleOpenModal}>Change Your Profile Picture</button>
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

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                    <label htmlFor="profilePicture">Upload Profile Picture</label>
                        <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            onChange={handleUploadProfilePicture}
                        />
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;

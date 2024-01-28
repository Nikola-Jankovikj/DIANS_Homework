import React, {useState} from "react";
import "./ChangePasswordForm.css";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = () => {
    const navigateProfile = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChangePassword = async () => {
        try {
            const response = await fetch("https://graceful-yoke-api.up.railway.app/authUser-service/user/changepassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmPassword,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setFeedbackMessage(data.message);
                setIsSuccess(true);
            } else {
                const errorData = await response.json();
                setFeedbackMessage(`${errorData.error}`);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Error changing password", error);
            setFeedbackMessage("Error changing password");
            setIsSuccess(false);
        }
    };

    return (
        <div className="change-password-container">
            <div className="profile-header">
                <button className="back-button" onClick={() => navigateProfile("/profile")}>
                    {" "}
                    &#x21D0;{" "}
                </button>
                <h1>Change Password</h1>
            </div>
            <form className="change-password-form">
                <div className="form-element">
                    <label className="change-password-label" htmlFor="currentPassword">Current Password</label>
                    <input
                        className="change-password-input"
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="form-element">
                    <label className="change-password-label" htmlFor="newPassword">New Password</label>
                    <input
                        className="change-password-input"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-element">
                    <label className="change-password-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="change-password-input"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className="change-password-button" onClick={handleChangePassword} type="button">
                    Save
                </button>
            </form>

            {feedbackMessage && (
                <p className={isSuccess ? "success" : "error"}>{feedbackMessage}</p>
            )}
        </div>
    );
};

export default ChangePasswordForm;

import "./LoginAndRegister.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:9000/authUser-service/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                }),
                // credentials: "include",
            });

            if (response.ok) {
                navigate("/login");
            } else {
                const errorData = await response.json();
                setError(errorData.token);
                console.error("EVE ERROR-OT: " + errorData);
            }
        } catch (error) {
            setError("Error during registration. Please try again.");
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className={"parentForm"}>
            <form className={"actualForm"} onSubmit={handleRegister}>
                <label htmlFor="email" className={"formLabel"}>
                    email
                </label>
                <input
                    type="email"
                    placeholder="youremail@email.com"
                    id="email"
                    name="email"
                    className={"formInput"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className={"formLabel"}>
                    password
                </label>
                <input
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                    className={"formInput"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword" className={"formLabel"}>
                    confirmPassword
                </label>
                <input
                    type="password"
                    placeholder="********"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={"formInput"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p style={{color: "red"}} className="error-message">{error}</p>}
                <button className={"formButton"} type="submit">
                    Register
                </button>
                <a href="/Login" className={"formAnchor"}>
                    Already have an account?
                </a>
            </form>
        </div>
    );
};

export default Register;

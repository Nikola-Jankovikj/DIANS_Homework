import "./LoginAndRegister.css"
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import browser from "leaflet/src/core/Browser";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const navigateHome = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:9000/authUser-service/auth/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("jwtToken", data.token)
                navigate("/home");
            } else {
                const errorData = await response.json();
                setError(errorData.token);
                console.error(errorData);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className={"parentForm"}>
            <form className={"actualForm"} onSubmit={navigateHome}>
                <label form="email" className={"formLabel"}>email</label>
                <input
                    type="email"
                    placeholder="youremail@email.com"
                    id="email"
                    name="email"
                    className={"formInput"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label form="password" className={"formLabel"}>password</label>
                <input type="password"
                       placeholder="********"
                       id="password"
                       name="password"
                       className={"formInput"}
                       onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{color: "red"}} className="error-message">{error}</p>}
                <button className={"formButton"} type="submit">
                    Log in
                </button>
                <a href="/Register" className={"formAnchor"}>
                    Don't have an account?
                </a>
            </form>
        </div>
    );
};

export default Login;
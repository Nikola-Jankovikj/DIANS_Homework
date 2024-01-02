import "./LoginAndRegister.css"
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Added state for error message
    const navigate = useNavigate();

    const navigateHome = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    email: email,
                    password: password,
                }),
                credentials: "include", // Include cookies in the request
            });

            if (response.ok) {
                // Successfully logged in
                const data = await response.json();
                console.log(data); // Log the response from the server
                console.log("SUCCESSFUL")
                navigate("/home");
            } else {
                // Handle login failure
                const errorData = await response.json();
                setError(errorData.info);
                console.error(errorData); // Log the error from the server
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
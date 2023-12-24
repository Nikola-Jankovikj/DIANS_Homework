import { useState } from "react";
import "./LoginAndRegister.css";
import {useNavigate} from "react-router-dom";
const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigateHome = () => {
        console.log('Navigate to home');
        navigate("/");
    }

    const handleLogin = async (e) => {

        e.preventDefault(); // Prevent the default form submission

        if (email === '' || password === '') {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: new URLSearchParams({
                    username: email, password
                })
            });

            if (response.ok) {
                // Successful login
                console.log('Login successful');

                // Navigate to the home page
                navigateHome();
            } else {
                // Login failure
                console.error('Login failed');
                console.error(response);
                setErrorMessage('Please enter valid information');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            setErrorMessage('An error occurred. Please try again.');
            setEmail('');
            setPassword('');
        }
    };

    return (

        <div className={"parentForm"}>
            <form className={"actualForm"} onSubmit={handleLogin}>
                <label htmlFor="email" className={"formLabel"}>
                    Email
                </label>
                <input
                    type="email"
                    placeholder="youremail@email.com"
                    id="email"
                    name="email"
                    className={"formInput"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className={"formLabel"}>
                    Password
                </label>
                <input
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                    className={"formInput"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}<br/>
                <button className={"formButton"} type="submit">
                    Log in
                </button>
                <a href="/register" className={"formAnchor"}>
                    Don't have an account?
                </a>
            </form>
        </div>

    );
};

export default Login
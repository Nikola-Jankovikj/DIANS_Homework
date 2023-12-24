import React, { useState } from 'react';
import "./LoginAndRegister.css"
import {useNavigate} from "react-router-dom";
const Register = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const navigateLogin = () => {
        console.log('Navigate to login');
        navigate("/login");
    }

    const handleRegister = async (e) => {

        e.preventDefault(); // Prevent the default form submission

        if (email === '' || password === '' || confirmPassword === '') {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        // TODO: Additional validation logic

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {

            // Request to register the new user
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const content = await response.json();

            console.log(content);

            if (response.ok) {
                // Successful registration
                console.log('Registration successful');

                // Navigate to the login page
                navigateLogin();
            } else {
                // Registration failure
                console.error('Registration failed');
                setErrorMessage('Registration failed. Please try again.');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
            setErrorMessage('An error occurred. Please try again.');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    return (

        <div className={"parentForm"}>
            <form className={"actualForm"} onSubmit={handleRegister}>
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
                <label htmlFor="confirmPassword" className={"formLabel"}>
                    ConfirmPassword
                </label>
                <input
                    type="password"
                    placeholder="********"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={"formInput"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}<br/>
                <button className={"formButton"} type="submit">
                    Register
                </button>
                <a href="/login" className={"formAnchor"}>
                    Already have an account? Log in
                </a>
            </form>
        </div>


    );
};

export default Register
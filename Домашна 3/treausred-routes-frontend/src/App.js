import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Favorites from "./favorites/Favorites";
import Profile from "./profile/Profile"
import ChangePasswordForm from "./forms/ChangePasswordForm";


function App() {

    return(
        <Router>
            <Routes>
                <Route path="" Component={Home} />
                <Route path="/home" Component={Home} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="/profile" Component={Profile} />
                <Route path="/favorites" Component={Favorites} />
                <Route path="/change-password" Component={ChangePasswordForm} />
            </Routes>
        </Router>
    );

}

export default App;
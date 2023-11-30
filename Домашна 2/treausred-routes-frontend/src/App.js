import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";


function App() {

    return(
        <Router>
            <Routes>
                <Route path="/home" Component={Home} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
            </Routes>
        </Router>
    );

}

export default App;

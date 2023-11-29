import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Monasteries from "./Monasteries";
import Archaeological from "./Archaeological";
import Museums from "./Museums";

function App() {

    return(
        <Router>
            <Routes>
                <Route path="/home" Component={Home} />
                <Route path="/monasteries" Component={Monasteries} />
                <Route path="/archaeological" Component={Archaeological} />
                <Route path="/museums" Component={Museums}/>
            </Routes>
        </Router>
    );

}

export default App;

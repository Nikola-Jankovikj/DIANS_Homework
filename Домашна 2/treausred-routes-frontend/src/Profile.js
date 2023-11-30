import "./Profile.css"
import {useNavigate} from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate()

    const navigateHome = () => {
        navigate("/home")
    }

    return(
        <div className="profile-container">
            <div className="profile-header">
                <button className="back-button" onClick={navigateHome}> Back </button>
                <h1>Your Profile</h1>
            </div>
            <div className="favorites-bar">
                <h2>Favorites</h2>
                <ul>
                    Favourite place 1
                </ul>
                <ul>
                    Favourite place 2
                </ul>
            </div>
        </div>
    )
}

export default Profile
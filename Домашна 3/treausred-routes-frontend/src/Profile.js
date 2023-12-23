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
                <button className="back-button" onClick={navigateHome}> &#x21D0; </button>
                <h1>ACCOUNT SETTINGS</h1>
            </div>
            <section id="settings">
                <div className="row">
                    <div id="profile-icon-acc">
                        <img src="/images/user.png" alt="Profile Image"/>
                    </div>
                    <button>change your profile picture</button>
                </div>
                <div className="row">
                    <div>e-mail</div>
                    <button>change your e-mail address</button>
                </div>
                <div className="row">
                    <div>password</div>
                    <button>change your password</button>
                </div>
                <div className="row">
                    <div>log out</div>
                    <button>log out</button>
                </div>
            </section>
        </div>
    )
}

export default Profile
import "./LoginAndRegister.css"
import {useNavigate} from "react-router-dom";
const Login = () => {

    const navigate = useNavigate()

    const navigateHome = () => {
        navigate("/home")
    }

    return (

        <div className={"parentForm"}>
            <form className={"actualForm"}>
                <label form="email" className={"formLabel"}>email</label>
                <input type="email" placeholder="youremail@email.com" id="email" name="email" className={"formInput"}/>
                <label form="password" className={"formLabel"}>password</label>
                <input type="password" placeholder="********" id="password" name="password" className={"formInput"}/>
                <button className={"formButton"} onClick={navigateHome}>Log in</button>
                <a href="/register" className={"formAnchor"}>Don't have an account?</a>
            </form>
        </div>

    );
};

export default Login
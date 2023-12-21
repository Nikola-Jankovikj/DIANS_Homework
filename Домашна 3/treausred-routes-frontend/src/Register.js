import "./LoginAndRegister.css"
const Register = () => {



    return (

        <div className={"parentForm"}>
            <form className={"actualForm"}>
                <label form="email" className={"formLabel"}>email</label>
                <input type="email" placeholder="youremail@email.com" id="email" name="email" className={"formInput"}/>
                <label form="password" className={"formLabel"}>password</label>
                <input type="password" placeholder="********" id="password" name="password" className={"formInput"}/>
                <label form="confirmPassword" className={"formLabel"}>confirmPassword</label>
                <input type="password" placeholder="********" id="confirmPassword" name="confirmPassword" className={"formInput"}/>
                <button className={"formButton"}>Register</button>
                <a href="/login" className={"formAnchor"}>Already have an account?</a>
            </form>
        </div>


    );
};

export default Register
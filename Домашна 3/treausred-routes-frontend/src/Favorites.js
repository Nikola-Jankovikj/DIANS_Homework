import "./Favorites.css"
import {useNavigate} from "react-router-dom";

const Favorites = () => {

    const navigate = useNavigate()

    const navigateHome = () => {
        navigate("/home")
    }

    return(
        <div className="favorites-container">
            <div className="favorites-header">
                <button className="back-button" onClick={navigateHome}> &#x21D0; </button>
                <h1>FAVORITES</h1>
            </div>
            <section id="favorites">
                <div className="favRow">
                    <div className="card">
                        <h2 className="cardTitle">Name</h2>
                        <section className="cardFt">
                            <div className="favorite">&#9829;</div>
                            <div className="rating">
                                &#9733; &#9733; &#9733; &#9733; &#9734;
                            </div>
                        </section>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Name</h2>
                        <section className="cardFt">
                            <div className="favorite">&#9829;</div>
                            <div className="rating">
                                &#9733; &#9733; &#9733; &#9733; &#9734;
                            </div>
                        </section>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Name</h2>
                        <section className="cardFt">
                            <div className="favorite">&#9829;</div>
                            <div className="rating">
                                &#9733; &#9733; &#9733; &#9733; &#9734;
                            </div>
                        </section>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Name</h2>
                        <section className="cardFt">
                            <div className="favorite">&#9829;</div>
                            <div className="rating">
                                &#9733; &#9733; &#9733; &#9733; &#9734;
                            </div>
                        </section>
                    </div>
                </div>
                <div className="favRow">
                    <div className="card">
                        <h2 className="cardTitle">Name</h2>
                        <section className="cardFt">
                            <div className="favorite">&#9829;</div>
                            <div className="rating">
                                &#9733; &#9733; &#9733; &#9733; &#9734;
                            </div>
                        </section>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Name</h2>
                        <section className="cardFt">
                            <div className="favorite">&#9829;</div>
                            <div className="rating">
                                &#9733; &#9733; &#9733; &#9733; &#9734;
                            </div>
                        </section>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Name</h2>
                        <section className="cardFt">
                            <div className="favorite">&#9829;</div>
                            <div className="rating">
                                &#9733; &#9733; &#9733; &#9733; &#9734;
                            </div>
                        </section>
                    </div>
                    <div className="card">
                        <h2 className="cardTitle">Name</h2>
                        <section className="cardFt">
                            <div className="favorite">&#9829;</div>
                            <div className="rating">
                                &#9733; &#9733; &#9733; &#9733; &#9734;
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Favorites
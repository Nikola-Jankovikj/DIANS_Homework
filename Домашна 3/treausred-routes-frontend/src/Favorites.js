import { useEffect, useState } from "react";
import "./Favorites.css";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch user's favorites from the server when the component mounts
        fetchFavorites();
    }, []);

    const fetchFavorites = () => {
        // Fetch user's favorites from the server
        fetch('http://localhost:8080/favorites/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Include any necessary authentication tokens or headers
        })
            .then(response => response.json())
            .then(data => setFavorites(data))
            .catch(error => console.error('Error fetching favorites:', error));
    };

    const removeFromFavorites = (objectId) => {
        // Send a request to remove the item from favorites
        fetch('http://localhost:8080/favorites', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ objectId }),
            // Include any necessary authentication tokens or headers
        })
            .then(response => {
                if (response.ok) {
                    // If the removal was successful, fetch updated favorites
                    fetchFavorites();
                } else {
                    console.error('Failed to remove from favorites');
                }
            })
            .catch(error => console.error('Error removing from favorites:', error));
    };

    const navigateHome = () => {
        navigate("/home");
    };

    return (
        <div className="favorites-container">
            <div className="favorites-header">
                <button className="back-button" onClick={navigateHome}> &#x21D0; </button>
                <h1>FAVORITES</h1>
            </div>
            <section id="favorites">
                <div className="favRow">
                    {favorites.map((favorite, index) => (
                        <div className="card" key={index}>
                            <h2 className="cardTitle">{favorite.name}</h2>
                            <section className="cardFt">
                                <button className="heartButton" onClick={() => removeFromFavorites(favorite.id)}>
                                    Remove
                                </button>
                                <div className="rating">
                                    &#9733; &#9733; &#9733; &#9733; &#9734;
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Favorites;

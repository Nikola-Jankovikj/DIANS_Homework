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

    const fetchFavorites = async () => {
        try {
            // Fetch user's favorites from the server
            const response = await fetch('http://localhost:8080/favorites/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Include any necessary authentication tokens or headers
            });

            if (response.ok) {
                const data = await response.json();

                // Fetch ratings for each favorite item
                const favoritesWithRatingsPromises = data.map(async (favorite) => {
                    const ratingResponse = await fetch(`http://localhost:8080/reviews/rating/${favorite.id}`);
                    const ratingData = await ratingResponse.json();
                    return { ...favorite, rating: ratingData };
                });

                const favoritesWithRatings = await Promise.all(favoritesWithRatingsPromises);

                setFavorites(favoritesWithRatings);
            } else {
                console.error('Failed to fetch favorites:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
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

    const handleRatingClick = async (objectId, ratingId) => {
        try {
            // Send the rating to the backend
            const response = await fetch(`http://localhost:8080/reviews/${objectId}/${ratingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // If the rating submission was successful, fetch updated ratings
                fetchFavorites();
            } else {
                console.error('Failed to submit rating');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                                    {[1, 2, 3, 4, 5].map((id) => (
                                        <span
                                            key={id}
                                            onClick={() => handleRatingClick(favorite.id, id)}
                                        >
                                            {id <= favorite.rating ? '★' : '☆'}
                                        </span>
                                    ))}
                                </div>
                                <span>Average: {favorite.rating}</span>
                            </section>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Favorites;

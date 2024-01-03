import { useEffect, useState } from "react";
import "./Favorites.css";
import { useNavigate } from "react-router-dom";

const Favorites = (state) => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:8080/favorites/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();

                const favoritesWithRatingsPromises = data.map(async (favorite) => {
                    const ratingResponse = await fetch(`http://localhost:8080/reviews/rating/${favorite.id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                        }
                    });
                    const ratingData = await ratingResponse.json();

                    const userRatingResponse = await fetch(`http://localhost:8080/reviews/userRating/${favorite.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                        },
                        credentials: "include",
                    });
                    const userRating = await userRatingResponse.json()

                    return { ...favorite, starRating: userRating, averageRating: ratingData };
                });

                const favoritesWithRatings = await Promise.all(favoritesWithRatingsPromises);

                setFavorites(favoritesWithRatings);
            } else {
                navigate("/login")
                console.error('Failed to fetch favorites:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const removeFromFavorites = (objectId) => {
        fetch('http://localhost:8080/favorites', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            credentials: "include",
            body: JSON.stringify({ objectId }),
        })
            .then(response => {
                if (response.ok) {
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
            const response = await fetch(`http://localhost:8080/reviews/${objectId}/${ratingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                credentials: "include",
            });

            if (response.ok) {
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
                                    DEL
                                </button>
                                <div className="rating">
                                    {[1, 2, 3, 4, 5].map((id) => (
                                        <span id="stars"
                                            key={id}
                                            onClick={() => handleRatingClick(favorite.id, id)}
                                        >
                                            {id <= favorite.starRating ? '★' : '☆'}
                                        </span>
                                    ))}
                                </div>
                                <span>Average: {favorite.averageRating}</span>
                            </section>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Favorites;

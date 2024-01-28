import {useContext, useEffect, useState} from "react";
import {StateContext} from "../Home";
import {fetchFavorite, fetchRating, fetchUserRating} from "../utils/popup_fetch_utils";
import {useNavigate} from "react-router-dom";

const PopupCard = ({obj, index, setAverageRatings, setRouteSites, handleAddToRoute}) => {

    const [favorite, setFavorite] = useState();
    const [myRating, setMyRating] = useState();
    const [averageRating, setAverageRating] = useState();

    const navigate = useNavigate()
    const state = useContext(StateContext);


    useEffect(  () => {

        fetchFavorite(obj, setFavorite)
        fetchRating(obj, setAverageRating)
        fetchUserRating(obj, setMyRating)

    }, [obj.id] )

    const handleToggleFavorite = async (objectId, locationName) => {
        try {
            const response = await fetch('https://graceful-yoke.railway.internal/favorite-service/favorites', {
                method: favorite ? 'DELETE' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                credentials: "include",
                body: JSON.stringify({ objectId }),
            });

            const newFavoriteState = !favorite
            setFavorite(newFavoriteState)

            if (!response.ok) {
                console.error('Failed to toggle favorites');
                const userChoice = window.confirm('You need to log in to add favorites. Log in?');
                if (userChoice) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleStarClick = async (objectId, rating) => {
        try {
            const response = await fetch(`https://graceful-yoke.railway.internal/review-service/reviews/${objectId}/${rating}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                credentials: "include",
            });

            if (response.ok) {
                setMyRating(rating)

                const avgRatingResponse = await fetch(`https://graceful-yoke.railway.internal/review-service/reviews/rating/${objectId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const avgRating = await avgRatingResponse.json();

                setAverageRating(avgRating)
            } else {
                console.error('Failed to add review');
                const userChoice = window.confirm('You need to log in to add a review. Log in?');
                if (userChoice) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <div className="card">
        <h2 className="cardTitle">{obj.name}</h2>
        <section className="cardFt">
            <button
                id="heart"
                className="heartButton"
                onClick={() => handleToggleFavorite(obj.id, index)}
            >
                {favorite ? '🤍️' : '♡'}
            </button>
            <div className="rating">
                {[1, 2, 3, 4, 5].map((starId) => (
                    <span
                        id="stars"
                        key={starId}
                        onClick={() => handleStarClick(obj.id, starId)}
                    >
                        {myRating >= starId ? '★' : '☆'}
                    </span>
                ))}
                <span className="averageRating">
                    {averageRating && ` ${averageRating.toFixed(1)}`}
                </span>
            </div>
            <button onClick={() => handleAddToRoute(obj)}>
                &#x1F697; Add route
            </button>
        </section>
    </div>
    )
}

export default PopupCard
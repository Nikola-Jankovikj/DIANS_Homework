import {useContext, useEffect, useState} from "react";
import {StateContext} from "../Home";
import favorites from "../favorites/Favorites";

const PopupCard = ({obj, index, setAverageRatings, setRouteSites, handleAddToRoute}) => {

    const [favorite, setFavorite] = useState();
    const [myRating, setMyRating] = useState();
    const [averageRating, setAverageRating] = useState();


    const state = useContext(StateContext);

    // const [userRatings, setUserRatings] = useState({});
    // const [favoritedStates, setFavoritedStates] = useState([]);

    useEffect(  () => {
        fetch(`http://localhost:8080/favorites/check/${obj.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then((resp) => {
            resp.json().then((data) => {
                setFavorite(data)
            })
        })

        fetch(`http://localhost:8080/reviews/rating/${obj.id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((resp) => {
            resp.json().then((data) => {
                setAverageRating(data)
            })
        })

        fetch(`http://localhost:8080/reviews/userRating/${obj.id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((resp) => {
            resp.json().then((data) => {
                setMyRating(data)
            })
        })


    }, [obj.id] )

    const handleToggleFavorite = async (objectId, locationName) => {
        try {
            const response = await fetch('http://localhost:8080/favorites', {
                method: favorite ? 'DELETE' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include", // Include cookies in the request
                body: JSON.stringify({ objectId }),
            });

            const newFavoriteState = !favorite
            setFavorite(newFavoriteState)

            if (!response.ok) {
                // setFavoritedStates(prevStates => {
                //     const newStates = [...prevStates];
                //     const index = state.findIndex(obj => obj.id === objectId);
                //     newStates[index] = !newStates[index];
                //     return newStates;
                // });

                console.error('Failed to toggle favorites');
            }
            // else {
            //     console.error('Failed to toggle favorites');
            // }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleStarClick = async (objectId, rating) => {
        try {
            const response = await fetch(`http://localhost:8080/reviews/${objectId}/${rating}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include", // Include cookies in the request
            });

            if (response.ok) {
                // Update user ratings
                // setUserRatings(prevRatings => ({
                //     ...prevRatings,
                //     [objectId]: rating,
                // }));
                setMyRating(rating)

                // Fetch and update average ratings
                const avgRatingResponse = await fetch(`http://localhost:8080/reviews/rating/${objectId}`);
                const avgRating = await avgRatingResponse.json();

                // setAverageRatings(prevAvgRatings => ({
                //     ...prevAvgRatings,
                //     [objectId]: avgRating,
                // }));
                setAverageRating(avgRating)
            } else {
                console.error('Failed to add review');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // const handleAddToRoute = async (site) => {
    //     try {
    //         // Send a POST request to the backend to add the site to the route
    //         const response = await fetch('http://localhost:8080/route/add', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ siteId: site.id }), // Pass the site ID to the backend
    //         });
    //
    //         if (response.ok) {
    //             console.log(`Site ${site.name} added to the route on the backend.`);
    //             // Update the routeSites state if needed
    //             setRouteSites((prevSites) => [...prevSites, site]);
    //         } else {
    //             console.error('Failed to add site to the route on the backend.');
    //         }
    //     } catch (error) {
    //         console.error('Error adding site to the route:', error);
    //     }
    // };
    
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
                    Average:
                    {averageRating && ` ${averageRating.toFixed(1)}`}
                </span>
            </div>
            <button onClick={() => handleAddToRoute(obj)}>
                + Add to Route
            </button>
        </section>
    </div>
    )
}

export default PopupCard
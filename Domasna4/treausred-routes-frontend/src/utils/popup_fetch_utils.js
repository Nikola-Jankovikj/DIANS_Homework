export function fetchFavorite (obj, setFavorite) {
    fetch(`https://graceful-yoke-api.up.railway.app/favorite-service/favorites/check/${obj.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        credentials: 'include',
    }).then((resp) => {
        resp.json().then((data) => {
            setFavorite(data)
        })
    })
}

export function fetchRating  (obj, setAverageRating)  {
    fetch(`https://graceful-yoke-api.up.railway.app/review-service/reviews/rating/${obj.id}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        credentials: 'include'
    }).then((resp) => {
        resp.json().then((data) => {
            setAverageRating(data)
        })
    })
}

export function fetchUserRating(obj, setMyRating){
    fetch(`https://graceful-yoke-api.up.railway.app/review-service/reviews/userRating/${obj.id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        credentials: 'include'
    }).then((resp) => {
        resp.json().then((data) => {
            setMyRating(data)
        })
    })
}
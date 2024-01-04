export function fetchFavorite (obj, setFavorite) {
    fetch(`http://localhost:9000/favorite-service/favorites/check/${obj.id}`, {
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
    fetch(`http://localhost:9000/review-service/reviews/rating/${obj.id}`,{
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
    fetch(`http://localhost:9000/review-service/reviews/userRating/${obj.id}`,{
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
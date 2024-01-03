export function fetchFavorite (obj, setFavorite) {
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
}

export function fetchRating  (obj, setAverageRating)  {
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
}

export function fetchUserRating(obj, setMyRating){
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
}
import {useEffect, useState} from "react";
import {calculateNewCenter, fetchData, getBoundingBox} from "../utils/search_utils";
import {useNavigate} from "react-router-dom";

const SearchComponent = ({updateMarkers, focusTarget, focusMap}, initialCenter) => {

    var objsForFocus = []
    const navigate = useNavigate()

    const setObjsForFocus = (data) => {
        objsForFocus = data
    }

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const updateQuery = (event) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        fetch(`https://graceful-yoke.railway.internal/element-service/api/search?query=${query}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
            .then(response => response.json())
            .then(suggestions => {
                setSuggestions(suggestions);
            }).catch(() => navigate("/login"))
    }, [query]);

    const selectSuggestion = (element) => {
        setQuery(element.name)
    }

    const onSearch = async (searchTerm) => {
        await fetchData(`https://graceful-yoke.railway.internal/element-service/api/search?query=${searchTerm}`, setObjsForFocus)
        var coordinates = calculateNewCenter(objsForFocus, initialCenter)
        if(coordinates.length === 1){
            updateMarkers(`https://graceful-yoke.railway.internal/element-service/api/search?query=${searchTerm}`)
            focusTarget(coordinates[0])
        }
        else{
            var boundingBox = getBoundingBox(coordinates)
            updateMarkers(`https://graceful-yoke.railway.internal/element-service/api/search?query=${searchTerm}`)
            focusMap(boundingBox)
        }
    }

    return (
        <div>
            <input type="text" value={query} onChange={updateQuery} placeholder="Search..." />
            <button onClick={() => onSearch(query)}>Search</button>
            <div className={"suggestions-dropdown"}>
                {suggestions.filter((suggestion) => {
                    const search = query.toLowerCase()
                    return search !== '' && suggestion.name.toLowerCase() !== search
                }).map((element) => (<div onClick={() => selectSuggestion(element)} className="dropdown-item">{element.name}</div>))}
            </div>
        </div>
    )
}

export default SearchComponent
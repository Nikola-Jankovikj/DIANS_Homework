import {useEffect, useState} from "react";
import {calculateNewCenter, fetchData, getBoundingBox} from "./utils";

const SearchComponent = ({updateMarkers, focusTarget, focusMap}, initialCenter) => {

    var objsForFocus = []

    const setObjsForFocus = (data) => {
        objsForFocus = data
    }

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const updateQuery = (event) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/search?query=${query}`)
            .then(response => response.json())
            .then(suggestions => {
                setSuggestions(suggestions);
            })
    }, [query]);

    const selectSuggestion = (element) => {
        setQuery(element.name)
    }

    const onSearch = async (searchTerm) => {
        await fetchData(`http://localhost:8080/api/search?query=${searchTerm}`, setObjsForFocus)
        var coordinates = calculateNewCenter(objsForFocus, initialCenter)
        if(coordinates.length === 1){
            updateMarkers(`http://localhost:8080/api/search?query=${searchTerm}`)
            focusTarget(coordinates[0])
        }
        else{
            var boundingBox = getBoundingBox(coordinates)
            updateMarkers(`http://localhost:8080/api/search?query=${searchTerm}`)
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
import {useEffect, useState} from "react";

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

    const calculateNewCenter = (objs) => {
        if (objs.length === 0){
            return [initialCenter]
        }

        if(objs.length === 1){
            return [[parseFloat(objs[0].lat), parseFloat(objs[0].lon)]]
        }


        const latitutes = objs.map((el) => parseFloat(el.lat))
        const longitutes = objs.map((el) => parseFloat(el.lon))

        const latLonArray = latitutes.map((lat, index) => [lat, longitutes[index]])
        return latLonArray
    }

    function getBoundingBox(coordinates) {
        if (coordinates.length === 0) {
            return null;
        }

        let minLat = coordinates[0][0];
        let maxLat = coordinates[0][0];
        let minLon = coordinates[0][1];
        let maxLon = coordinates[0][1];

        for (const [lat, lon] of coordinates) {
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
            minLon = Math.min(minLon, lon);
            maxLon = Math.max(maxLon, lon);
        }

        return [
            [minLat, minLon],
            [maxLat, maxLon]
        ];
    }

    const onSearch = async (searchTerm) => {

        const fetchData = async () => {
            //setUrl(`http://localhost:8080/api/search?query=${searchTerm}`);
            //updateMarkers(`http://localhost:8080/api/search?query=${searchTerm}`)
            await fetch(`http://localhost:8080/api/search?query=${searchTerm}`)
                .then(data => data.json())
                .then(data => {
                    setObjsForFocus(data)
                })
        }

        await fetchData()
        var coordinates = calculateNewCenter(objsForFocus)
        if(coordinates.length === 1){
            updateMarkers(`http://localhost:8080/api/search?query=${searchTerm}`, coordinates[0])
            focusTarget(coordinates[0])
        }
        else{
            var boundingBox = getBoundingBox(coordinates)
            updateMarkers(`http://localhost:8080/api/search?query=${searchTerm}`, boundingBox)
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
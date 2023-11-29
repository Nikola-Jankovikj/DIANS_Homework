import {useEffect, useState} from "react";

const List = () => {
    const [state, setState] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/all')
            .then(response => response.json())
            .then(data => {
                setState(data);
            })
    }, []);


    return (
        state.map(obj =>
            <div key={obj.id}>
                {obj.name}
            </div>
        )
    );
}
export default List;
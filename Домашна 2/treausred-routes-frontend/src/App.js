import './App.css';
import {useEffect, useState} from "react";

function App() {

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

export default App;

import "leaflet/dist/leaflet.css"
import './MapComponent.css';
import MapComponent from "./MapComponent";

const Home = () => {

    return(
        <MapComponent url={'http://localhost:8080/api/all'} />
    )
}

export default Home
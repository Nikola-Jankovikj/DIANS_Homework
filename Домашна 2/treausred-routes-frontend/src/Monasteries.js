import "leaflet/dist/leaflet.css"
import './MapComponent.css';
import MapComponent from "./MapComponent";
const Monasteries = () => {

    return(
        <MapComponent url={'http://localhost:8080/api/monasteries'} />
    )
}

export default Monasteries
import "leaflet/dist/leaflet.css"
import './MapComponent.css';
import MapComponent from "./MapComponent";

const Museums = () => {

    return(
        <MapComponent url={'http://localhost:8080/api/museums'} />
    )
}

export default Museums
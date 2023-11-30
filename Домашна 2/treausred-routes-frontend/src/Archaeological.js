import "leaflet/dist/leaflet.css"
import './MapComponent.css';
import MapComponent from "./MapComponent";

const Archaeological = () => {

    return(
            <MapComponent url={'http://localhost:8080/api/archaeologicalSites'} />
    )

}

export default Archaeological
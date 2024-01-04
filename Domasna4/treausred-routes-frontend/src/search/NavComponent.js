const NavComponent = ({updateMarkers}) => {

    const findAll = () => {
        updateMarkers('http://localhost:9000/element-service/api/all')
    }

    const findMuseums = () => {
        updateMarkers('http://localhost:9000/element-service/api/museums')
    }

    const findArchaeologicalSites = () => {
        updateMarkers('http://localhost:9000/element-service/api/archaeologicalSites')
    }

    const findMonasteries = () => {
        updateMarkers('http://localhost:9000/element-service/api/monasteries')
    }


    return(
        <div id="nav">
            <button onClick={findAll}>All</button>
            <button onClick={findMuseums}>Museums</button>
            <button onClick={findArchaeologicalSites}>Archaeological Sites</button>
            <button onClick={findMonasteries}>Monasteries</button>
        </div>
    )
}

export default NavComponent
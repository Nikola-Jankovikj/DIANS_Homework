const NavComponent = ({updateMarkers}) => {

    const findAll = () => {
        updateMarkers('http://localhost:8080/api/all')
    }

    const findMuseums = () => {
        updateMarkers('http://localhost:8080/api/museums')
    }

    const findArchaeologicalSites = () => {
        updateMarkers('http://localhost:8080/api/archaeologicalSites')
    }

    const findMonasteries = () => {
        updateMarkers('http://localhost:8080/api/monasteries')
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
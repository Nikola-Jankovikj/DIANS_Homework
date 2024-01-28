const NavComponent = ({updateMarkers}) => {

    const findAll = () => {
        updateMarkers('https://graceful-yoke.railway.internal/element-service/api/all')
    }

    const findMuseums = () => {
        updateMarkers('https://graceful-yoke.railway.internal/element-service/api/museums')
    }

    const findArchaeologicalSites = () => {
        updateMarkers('https://graceful-yoke.railway.internal/element-service/api/archaeologicalSites')
    }

    const findMonasteries = () => {
        updateMarkers('https://graceful-yoke.railway.internal/element-service/api/monasteries')
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
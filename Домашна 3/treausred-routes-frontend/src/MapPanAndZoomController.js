import {useMap} from "react-leaflet";
import {forwardRef, useImperativeHandle} from "react";
import {latLngBounds} from "leaflet/dist/leaflet-src.esm";

const MapPanAndZoomController = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => {
        return {
            focusMap: focusWholeMap,
            focusTarget: focusOnTarget
        }
    })
    const myMap = useMap()
    

    const focusOnTarget = (coordinates) => {
        myMap.setView(coordinates, 15)
    }

    const focusWholeMap = (coordinates) => {
        // var bounds = latLngBounds(coordinates)
        // console.log("BOUNDS INSIDE CONTROLLER: "+bounds)
        myMap.fitBounds(coordinates)
    }

    return(
        <div></div>
    )
})

export default MapPanAndZoomController

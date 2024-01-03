import {useMap} from "react-leaflet";
import {forwardRef, useImperativeHandle} from "react";
import {latLngBounds} from "leaflet/dist/leaflet-src.esm";
import {setOptions} from "leaflet/src/core";

const MapPanAndZoomController = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => {
        return {
            focusMap: focusWholeMap,
            focusTarget: focusOnTarget,
            resetMapFocus: resetMapFocus
        }
    })
    const myMap = useMap()

    const resetMapFocus = (defaultView, defaultZoom) => {
        myMap.setView(defaultView, defaultZoom)
    }

    const focusOnTarget = (coordinates) => {
        myMap.setView(coordinates, 15)

    }

    const focusWholeMap = (coordinates) => {
        myMap.fitBounds(coordinates)
    }

    return(
        <div></div>
    )
})

export default MapPanAndZoomController

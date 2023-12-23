
export function calculateNewCenter (objs, defaultCenter) {
    if (objs.length === 0){
        console.log(objs.length)
        return [defaultCenter]
    }

    if(objs.length === 1){
        return [[parseFloat(objs[0].lat), parseFloat(objs[0].lon)]]
    }

    const latitutes = objs.map((el) => parseFloat(el.lat))
    const longitutes = objs.map((el) => parseFloat(el.lon))

    const latLonArray = latitutes.map((lat, index) => [lat, longitutes[index]])
    return latLonArray
}

export function getBoundingBox(coordinates) {
    if (coordinates.length === 0) {
        return null;
    }

    let minLat = coordinates[0][0];
    let maxLat = coordinates[0][0];
    let minLon = coordinates[0][1];
    let maxLon = coordinates[0][1];

    for (const [lat, lon] of coordinates) {
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
    }

    return [
        [minLat, minLon],
        [maxLat, maxLon]
    ];
}

export async function fetchData (url, callbackForSet)  {
      await fetch(url)
        .then(data => data.json())
        .then(data => {
            callbackForSet(data)
        })
}
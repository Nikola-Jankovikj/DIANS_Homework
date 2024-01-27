export function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    resolve([latitude, longitude]);
                },
                () => {
                    console.log("Unable to retrieve your location");
                    reject([]);
                }
            );
        } else {
            console.log("Geolocation not supported");
            reject([]);
        }
    });
}
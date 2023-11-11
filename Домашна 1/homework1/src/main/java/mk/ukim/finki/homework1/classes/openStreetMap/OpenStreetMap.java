package mk.ukim.finki.homework1.classes.openStreetMap;

public class OpenStreetMap {
    private final String queryString;

    public OpenStreetMap(String queryString) {
        this.queryString = queryString;
    }

    public String getApiUrlForQueryString() {
        return "http://overpass-api.de/api/interpreter?data=" + queryString;
    }
}

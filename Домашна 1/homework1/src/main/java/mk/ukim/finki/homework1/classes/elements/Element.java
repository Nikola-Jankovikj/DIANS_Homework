package mk.ukim.finki.homework1.classes.elements;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class Element {
    private String id;
    private String name;
    private String type;
    private String amenity;
    private String tourism;
    private String lat;
    private String lon;

    public Element(String id, String name, String amenity, String tourism, String lat, String lon) {
        this.id = id;
        this.name = name;
        this.amenity = amenity;
        this.tourism = tourism;
        this.lat = lat;
        this.lon = lon;
    }

    @Override
    public String toString() {
        return String.format("%s, %s, %s, %s, %s", name, type, id, lat, lon);
    }
}

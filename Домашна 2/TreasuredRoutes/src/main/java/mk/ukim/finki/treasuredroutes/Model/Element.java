package mk.ukim.finki.treasuredroutes.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Entity
@Table(name = "database")
@NoArgsConstructor
@AllArgsConstructor
public class Element implements Serializable {
    //private String id;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String amenity;
    private String tourism;
    private String historic;
    private String religion;
    private String lat;
    private String lon;
    public Element(String name, String amenity, String tourism, String historic, String religion, String lat, String lon) {
        this.name = name;
        this.amenity = amenity;
        this.tourism = tourism;
        this.historic = historic;
        this.religion = religion;
        this.lat = lat;
        this.lon = lon;
    }

    @Override
    public String toString() {
        return String.format("%s, %s, %s, %s, %s", name, type, id, lat, lon);
    }

    public void setId(Long id) {
        this.id = id;
    }


}

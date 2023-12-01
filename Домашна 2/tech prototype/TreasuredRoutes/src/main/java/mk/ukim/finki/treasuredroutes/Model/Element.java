package mk.ukim.finki.treasuredroutes.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Entity
@Table(name = "ELEMENT")
@NoArgsConstructor
@AllArgsConstructor
public class Element implements Serializable {
    @Id
    private String id;
    private String name;
    private String type;
    private String lat;
    private String lon;

    @Override
    public String toString() {
        return String.format("%s, %s, %s, %s, %s", id, name, type, lat, lon);
    }

}

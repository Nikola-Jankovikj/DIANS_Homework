package mk.ukim.finki.treasuredroutes.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@NoArgsConstructor
@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    Element StartingLocation;

    @ManyToMany(cascade = CascadeType.ALL)
    Collection<Element> RouteSites;

    @OneToOne
    private User userOfRoute;
}

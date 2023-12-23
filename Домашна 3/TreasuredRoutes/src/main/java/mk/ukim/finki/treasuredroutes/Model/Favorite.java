package mk.ukim.finki.treasuredroutes.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Element element;

    public Favorite(User user, Element element) {
        this.user = user;
        this.element = element;
    }
}

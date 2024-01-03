package mk.ukim.finki.treasuredroutes.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Element element;

    private int rating;

    public Review(User user, Element element, int rating) {
        this.user = user;
        this.element = element;
        this.rating = rating;
    }
}

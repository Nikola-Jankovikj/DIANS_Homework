package mk.ukim.finki.favoriteservice.model;

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

    private Long userId;

    private Long elementId;

    public Favorite(Long userId, Long elementId) {
        this.userId = userId;
        this.elementId = elementId;
    }
}

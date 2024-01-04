package mk.ukim.finki.reviewservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity

public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long elementId;

    private int rating;

    public Review(Long userId, Long elementId, int rating) {
        this.userId = userId;
        this.elementId = elementId;
        this.rating = rating;
    }
}

package mk.ukim.finki.reviewservice.repository;

import mk.ukim.finki.reviewservice.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewsRepository extends JpaRepository<Review, Long> {
    List<Review> findByUserId(Long userId);
    List<Review> findByElementId(Long elementId);
    Optional<Review> findByUserIdAndElementId(Long userId, Long elementId);
}

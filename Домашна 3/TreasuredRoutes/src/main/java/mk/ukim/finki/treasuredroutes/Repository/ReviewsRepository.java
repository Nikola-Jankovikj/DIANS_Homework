package mk.ukim.finki.treasuredroutes.Repository;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Review;
import mk.ukim.finki.treasuredroutes.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewsRepository extends JpaRepository<Review, Long> {
    List<Review> findByUser(User user);
    List<Review> findByElement(Element element);
    Optional<Review> findByUserAndElement(User user, Element element);
}

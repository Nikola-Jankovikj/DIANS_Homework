package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Review;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.ElementRepository;
import mk.ukim.finki.treasuredroutes.Repository.ReviewsRepository;
import mk.ukim.finki.treasuredroutes.Repository.UserRepository;
import mk.ukim.finki.treasuredroutes.Service.ReviewsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewsServiceImplementation implements ReviewsService {
    private final ReviewsRepository reviewsRepository;
    private final UserRepository userRepository;
    private final ElementRepository elementRepository;

    public ReviewsServiceImplementation(ReviewsRepository reviewsRepository,
                                        UserRepository userRepository,
                                        ElementRepository elementRepository) {
        this.reviewsRepository = reviewsRepository;
        this.userRepository = userRepository;
        this.elementRepository = elementRepository;
    }

    @Override
    public void addReview(Long userId, Long elementId, int rating) {
        User user = userRepository.findById(userId).orElse(null);
        Element element = elementRepository.findById(elementId).orElse(null);
        Review review = new Review(user, element, rating);
        if (reviewsRepository.findByUserAndElement(user, element) != null) {
            review = reviewsRepository.findByUserAndElement(user, element);
            review.setRating(rating);
        }
        reviewsRepository.save(review);
    }

    @Override
    public void removeReview(Long userId, Long elementId) {
        User user = userRepository.findById(userId).orElse(null);
        Element element = elementRepository.findById(elementId).orElse(null);
        Review review = reviewsRepository.findByUserAndElement(user, element);
        reviewsRepository.delete(review);
    }

    @Override
    public List<Review> getUserReviews(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return reviewsRepository.findByUser(user);
    }

    @Override
    public double getElementRating(Long elementId) {
        Element element = elementRepository.findById(elementId).orElse(null);
        return reviewsRepository.findByElement(element)
                .stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0);
    }

    @Override
    public int getRatingByUserAndElement(Long userId, Long elementId) {
        User user = userRepository.findById(userId).orElse(null);
        Element element = elementRepository.findById(elementId).orElse(null);
        return reviewsRepository.findByUserAndElement(user, element).getRating();
    }
}

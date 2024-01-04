package mk.ukim.finki.reviewservice.service.implementation;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.reviewservice.model.Review;
import mk.ukim.finki.reviewservice.model.exceptions.ReviewNotFoundException;
import mk.ukim.finki.reviewservice.repository.ReviewsRepository;
import mk.ukim.finki.reviewservice.service.ReviewsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewsServiceImplementation implements ReviewsService {

    private final ReviewsRepository reviewsRepository;

    @Override
    public void addReview(Long userId, Long elementId, int rating) {
        Review review = new Review(userId, elementId, rating);
        Review existing = reviewsRepository.findByUserIdAndElementId(userId, elementId).orElse(null);
        if (existing != null) {
            review = existing;
            review.setRating(rating);
        }
        reviewsRepository.save(review);
    }

    @Override
    public void removeReview(Long userId, Long elementId) {
        Review review = reviewsRepository.findByUserIdAndElementId(userId, elementId).orElse(null);
        reviewsRepository.delete(review);
    }

    @Override
    public List<Review> getUserReviews(Long userId) {
        return reviewsRepository.findByUserId(userId);
    }

    @Override
    public double getElementRating(Long elementId) {
        return reviewsRepository.findByElementId(elementId)
                .stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0);
    }

    @Override
    public int getRatingByUserAndElement(Long userId, Long elementId) throws ReviewNotFoundException {
        Review review = reviewsRepository.findByUserIdAndElementId(userId, elementId)
                .orElseThrow(ReviewNotFoundException::new);
        return review.getRating();
    }
}

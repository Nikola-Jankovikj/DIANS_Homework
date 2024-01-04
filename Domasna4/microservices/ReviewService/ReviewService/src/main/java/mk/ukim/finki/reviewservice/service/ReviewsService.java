package mk.ukim.finki.reviewservice.service;

import mk.ukim.finki.reviewservice.model.Review;
import mk.ukim.finki.reviewservice.model.exceptions.ReviewNotFoundException;

import java.util.List;

public interface ReviewsService {
    void addReview(Long userId, Long elementId, int rating);
    void removeReview(Long userId, Long elementId);
    List<Review> getUserReviews(Long userId);
    double getElementRating(Long elementId);
    int getRatingByUserAndElement(Long userId, Long elementId) throws ReviewNotFoundException;
}
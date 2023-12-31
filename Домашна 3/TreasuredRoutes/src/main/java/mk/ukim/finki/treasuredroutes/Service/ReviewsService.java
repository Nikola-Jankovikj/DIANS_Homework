package mk.ukim.finki.treasuredroutes.Service;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.ReviewNotFoundException;
import mk.ukim.finki.treasuredroutes.Model.Review;

import java.util.List;

public interface ReviewsService {
    void addReview(Long userId, Long elementId, int rating);
    void removeReview(Long userId, Long elementId);
    List<Review> getUserReviews(Long userId);
    double getElementRating(Long elementId);
    int getRatingByUserAndElement(Long userId, Long elementId) throws ReviewNotFoundException;
}
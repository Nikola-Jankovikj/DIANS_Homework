package mk.ukim.finki.reviewservice.web;

import lombok.RequiredArgsConstructor;

import mk.ukim.finki.reviewservice.model.Review;
import mk.ukim.finki.reviewservice.model.exceptions.ReviewNotFoundException;
import mk.ukim.finki.reviewservice.service.ReviewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@Validated
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewsController {

    private final ReviewsService reviewsService;

    @GetMapping("/rating/{elementId}")
    public ResponseEntity<Double> getElementRating(@PathVariable Long elementId) {
        Double rating = reviewsService.getElementRating(elementId);
        return ResponseEntity.ok(rating);
    }

    @GetMapping("/allUserReviews")
    public ResponseEntity<List<Review>> getUserReviews() {
        Long userId = reviewsService.authUserId("authUser-service");
        List<Review> reviews = reviewsService.getUserReviews(userId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/userRating/{elementId}")
    public ResponseEntity<Integer> getRatingByUserAndElement(@PathVariable Long elementId) {
        int userRating;
        Long userId = reviewsService.authUserId("authUser-service");
        try {
            userRating = reviewsService.getRatingByUserAndElement(userId, elementId);
        } catch (ReviewNotFoundException e) {
            return ResponseEntity.badRequest().body(0);
        }
        return ResponseEntity.ok(userRating);
    }

    @PutMapping("{elementId}/{rating}")
    public ResponseEntity<String> addReview(
            @PathVariable Long elementId,
            @PathVariable int rating)
    {
        Long userId = reviewsService.authUserId("authUser-service");
        reviewsService.addReview(userId, elementId, rating);
        return ResponseEntity.ok("{\"info\": \"Added review\"}");
    }

    @DeleteMapping("/{elementId}")
    public ResponseEntity<String> deleteFromFavorites(@PathVariable Long elementId) {
        Long userId = reviewsService.authUserId("authUser-service");
        reviewsService.removeReview(userId, elementId);
        return ResponseEntity.ok("{\"info\": \"Removed review\"}");
    }
}

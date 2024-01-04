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
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewsController {

    private final ReviewsService reviewsService;
    //private final AuthenticationService authenticationService;

    @GetMapping("/rating/{elementId}")
    public ResponseEntity<Double> getElementRating(@PathVariable Long elementId) {
        Double rating = reviewsService.getElementRating(elementId);
        return ResponseEntity.ok(rating);
    }

    @GetMapping("/allUserReviews")
    public ResponseEntity<List<Review>> getUserReviews() {
        List<Review> reviews = reviewsService.getUserReviews(1L);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/userRating/{elementId}")
    public ResponseEntity<Integer> getRatingByUserAndElement(@PathVariable Long elementId) {
        int userRating;
        try {
            userRating = reviewsService.getRatingByUserAndElement(1L, elementId);
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
        reviewsService.addReview(1L, elementId, rating);
        return ResponseEntity.ok("{\"info\": \"Added review\"}");
    }

    @DeleteMapping("/{elementId}")
    public ResponseEntity<String> deleteFromFavorites(@PathVariable Long elementId) {
        reviewsService.removeReview(1L, elementId);
        return ResponseEntity.ok("{\"info\": \"Removed review\"}");
    }
}

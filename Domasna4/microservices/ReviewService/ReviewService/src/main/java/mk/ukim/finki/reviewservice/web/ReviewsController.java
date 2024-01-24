package mk.ukim.finki.reviewservice.web;

import lombok.RequiredArgsConstructor;

import mk.ukim.finki.reviewservice.model.Review;
import mk.ukim.finki.reviewservice.model.exceptions.ReviewNotFoundException;
import mk.ukim.finki.reviewservice.service.ReviewsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<List<Review>> getUserReviews(
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader)
    {
        Long userId = reviewsService.authUserId("authUser-service", authorizationHeader);
        List<Review> reviews = reviewsService.getUserReviews(userId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/userRating/{elementId}")
    public ResponseEntity<Integer> getRatingByUserAndElement(
            @PathVariable Long elementId,
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        int userRating;
        Long userId = reviewsService.authUserId("authUser-service", authorizationHeader);
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
            @PathVariable int rating,
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader)
    {
        Long userId = reviewsService.authUserId("authUser-service", authorizationHeader);
        reviewsService.addReview(userId, elementId, rating);
        return ResponseEntity.ok("{\"info\": \"Added review\"}");
    }

    @DeleteMapping("/{elementId}")
    public ResponseEntity<String> deleteFromFavorites(
            @PathVariable Long elementId,
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        Long userId = reviewsService.authUserId("authUser-service", authorizationHeader);
        reviewsService.removeReview(userId, elementId);
        return ResponseEntity.ok("{\"info\": \"Removed review\"}");
    }
}

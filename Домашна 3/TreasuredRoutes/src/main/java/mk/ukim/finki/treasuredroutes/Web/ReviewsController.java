package mk.ukim.finki.treasuredroutes.Web;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailDoesNotExist;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.ReviewNotFoundException;
import mk.ukim.finki.treasuredroutes.Model.Review;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Service.ReviewsService;
import mk.ukim.finki.treasuredroutes.auth.AuthenticationService;
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
    private final AuthenticationService authenticationService;

    @GetMapping("/rating/{elementId}")
    public ResponseEntity<Double> getElementRating(@PathVariable Long elementId) {
        Double rating = reviewsService.getElementRating(elementId);
        return ResponseEntity.ok(rating);
    }

    @GetMapping("/allUserReviews")
    public ResponseEntity<List<Review>> getUserReviews() {
        User user = null;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body(null);
        }
        List<Review> reviews = reviewsService.getUserReviews(user.getId());
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/userRating/{elementId}")
    public ResponseEntity<Integer> getRatingByUserAndElement(@PathVariable Long elementId) {
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body(0);
        }
        Integer userRating = null;
        try {
            userRating = reviewsService.getRatingByUserAndElement(user.getId(), elementId);
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
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body("{\"info\":  \""+ e.getMessage() + "\"}");
        }
        reviewsService.addReview(user.getId(), elementId, rating);
        return ResponseEntity.ok("{\"info\": \"Added review\"}");
    }

    @DeleteMapping("/{elementId}")
    public ResponseEntity<String> deleteFromFavorites(@PathVariable Long elementId) {
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body("{\"info\":  \""+ e.getMessage() + "\"}");
        }
        reviewsService.removeReview(user.getId(), elementId);
        return ResponseEntity.ok("{\"info\": \"Removed review\"}");
    }
}

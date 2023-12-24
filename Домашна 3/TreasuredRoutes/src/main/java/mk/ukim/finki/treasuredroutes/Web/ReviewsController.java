package mk.ukim.finki.treasuredroutes.Web;

import jakarta.servlet.http.HttpServletRequest;
import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Review;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Service.ReviewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reviews")
public class ReviewsController {

    private final ReviewsService reviewsService;

    public ReviewsController(ReviewsService reviewsService) {
        this.reviewsService = reviewsService;
    }

    @GetMapping("/rating/{elementId}")
    public ResponseEntity<Double> getElementRating(@PathVariable Long elementId) {
        Double rating = reviewsService.getElementRating(elementId);
        return ResponseEntity.ok(rating);
    }

    @GetMapping("/allUserReviews")
    public ResponseEntity<List<Review>> getUserReviews(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        List<Review> reviews = reviewsService.getUserReviews(user.getId());
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/userRating/{elementId}")
    public ResponseEntity<Integer> getRatingByUserAndElement(@PathVariable Long elementId,
                                                             HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        Integer userRating = reviewsService.getRatingByUserAndElement(user.getId(), elementId);
        return ResponseEntity.ok(userRating);
    }

    @PutMapping("{elementId}/{rating}")
    public ResponseEntity<String> addReview(@PathVariable Long elementId,
                                            @PathVariable int rating,
                                            HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        reviewsService.addReview(user.getId(), elementId, rating);
        return ResponseEntity.ok("Added review");
    }

    @DeleteMapping("/{elementId}")
    public ResponseEntity<String> deleteFromFavorites(@PathVariable Long elementId,
                                                      HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        reviewsService.removeReview(user.getId(), elementId);
        return ResponseEntity.ok("Removed review");
    }
}

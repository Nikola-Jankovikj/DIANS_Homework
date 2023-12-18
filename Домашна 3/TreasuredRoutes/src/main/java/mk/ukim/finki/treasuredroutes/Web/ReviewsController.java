package mk.ukim.finki.treasuredroutes.Web;

import mk.ukim.finki.treasuredroutes.Model.Element;
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

    @PutMapping("{elementId}/{rating}")
    public ResponseEntity<String> addReview(@PathVariable Long elementId, @PathVariable int rating) {
        reviewsService.addReview(1L, elementId, rating);
        return ResponseEntity.ok("Added review");
    }

    @DeleteMapping("/{elementId}")
    public ResponseEntity<String> deleteFromFavorites(@PathVariable Long elementId) {
        reviewsService.removeReview(1L, elementId);
        return ResponseEntity.ok("Removed review");
    }
}

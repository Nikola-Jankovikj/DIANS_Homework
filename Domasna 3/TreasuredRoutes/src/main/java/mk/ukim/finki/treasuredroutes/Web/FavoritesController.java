package mk.ukim.finki.treasuredroutes.Web;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Service.FavoritesService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/favorites")
public class FavoritesController {

    private final FavoritesService favoritesService;

    public FavoritesController(FavoritesService favoritesService) {
        this.favoritesService = favoritesService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Element>> getUserFavorites() {
        List<Element> userFavorites = favoritesService.getUserFavorites(1L);
        return ResponseEntity.ok(userFavorites);
    }

    @PutMapping()
    public ResponseEntity<String> addToFavorites(@RequestBody Map<String, Long> requestBody) {
        Long elementId = requestBody.get("objectId");
        favoritesService.addToFavorites(1L, elementId);
        return ResponseEntity.ok("Added to favorites");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFromFavorites(@RequestBody Map<String, Long> requestBody) {
        Long elementId = requestBody.get("objectId");
        favoritesService.removeFromFavorites(1L, elementId);
        return ResponseEntity.ok("Added to favorites");
    }
}

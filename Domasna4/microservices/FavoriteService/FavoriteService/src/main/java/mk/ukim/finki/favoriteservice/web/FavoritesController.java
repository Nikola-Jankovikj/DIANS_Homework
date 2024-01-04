package mk.ukim.finki.favoriteservice.web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.favoriteservice.service.FavoritesService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/favorites")
@RequiredArgsConstructor
public class FavoritesController {

    private final FavoritesService favoritesService;
    //private final AuthenticationService authenticationService;

    @GetMapping("/all")
    public ResponseEntity<List<Long>> getUserFavorites() {
        List<Long> userFavorites = favoritesService.getUserFavorites(1L);
        return ResponseEntity.ok(userFavorites);
    }

    @PutMapping()
    public ResponseEntity<String> addToFavorites(@RequestBody Map<String, Long> requestBody) {
        Long elementId = requestBody.get("objectId");
        favoritesService.addToFavorites(1L, elementId);
        return ResponseEntity.ok("{\"info\": \"Added to favorites\"}");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFromFavorites(@RequestBody Map<String, Long> requestBody) {
        Long elementId = requestBody.get("objectId");
        favoritesService.removeFromFavorites(1L, elementId);
        return ResponseEntity.ok("{\"info\": \"Removed from favorites\"}");
    }

    @GetMapping("/check/{elementId}")
    public ResponseEntity<Boolean> checkIfElementIsFavoritedByUser(@PathVariable Long elementId){
        boolean isFavorited = favoritesService.isElementFavorited(1L, elementId);
        return ResponseEntity.ok(isFavorited);
    }
}

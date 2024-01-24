package mk.ukim.finki.favoriteservice.web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.favoriteservice.service.FavoritesService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
//@Validated
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/favorites")
@RequiredArgsConstructor
public class FavoritesController {

    private final FavoritesService favoritesService;

    @GetMapping("/all")
    public ResponseEntity<List<Long>> getUserFavorites(
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        Long userId = favoritesService.authUserId("authUser-service", authorizationHeader);
        System.out.println("USER ID: " + userId);

        List<Long> userFavorites = favoritesService.getUserFavorites(userId);
        return ResponseEntity.ok(userFavorites);
    }

    @PutMapping()
    public ResponseEntity<String> addToFavorites(
            @RequestBody Map<String, Long> requestBody,
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        Long elementId = requestBody.get("objectId");
        Long userId = favoritesService.authUserId("authUser-service", authorizationHeader);
        favoritesService.addToFavorites(userId, elementId);
        return ResponseEntity.ok("{\"info\": \"Added to favorites\"}");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFromFavorites(
            @RequestBody Map<String, Long> requestBody,
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        Long elementId = requestBody.get("objectId");
        Long userId = favoritesService.authUserId("authUser-service", authorizationHeader);
        favoritesService.removeFromFavorites(userId, elementId);
        return ResponseEntity.ok("{\"info\": \"Removed from favorites\"}");
    }

    @GetMapping("/check/{elementId}")
    public ResponseEntity<Boolean> checkIfElementIsFavoritedByUser(
            @PathVariable Long elementId,
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader){
        Long userId = favoritesService.authUserId("authUser-service",authorizationHeader);
        boolean isFavorited = favoritesService.isElementFavorited(userId, elementId);
        return ResponseEntity.ok(isFavorited);
    }
}

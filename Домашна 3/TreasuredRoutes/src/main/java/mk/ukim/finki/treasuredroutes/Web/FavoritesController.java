package mk.ukim.finki.treasuredroutes.Web;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailDoesNotExist;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Service.FavoritesService;
import mk.ukim.finki.treasuredroutes.auth.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/favorites")
@RequiredArgsConstructor
public class FavoritesController {

    private final FavoritesService favoritesService;
    private final AuthenticationService authenticationService;

    @GetMapping("/all")
    public ResponseEntity<List<Element>> getUserFavorites() {
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body(null);
        }
        List<Element> userFavorites = favoritesService.getUserFavorites(user.getId());
        return ResponseEntity.ok(userFavorites);
    }

    @PutMapping()
    public ResponseEntity<String> addToFavorites(@RequestBody Map<String, Long> requestBody) {
        Long elementId = requestBody.get("objectId");
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body("{\"info\":  \""+ e.getMessage() + "\"}");
        }
        favoritesService.addToFavorites(user.getId(), elementId);
        return ResponseEntity.ok("{\"info\": \"Added to favorites\"}");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFromFavorites(@RequestBody Map<String, Long> requestBody) {
        Long elementId = requestBody.get("objectId");
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body("{\"info\":  \""+ e.getMessage() + "\"}");
        }
        favoritesService.removeFromFavorites(user.getId(), elementId);
        return ResponseEntity.ok("{\"info\": \"Removed from favorites\"}");
    }

    @GetMapping("/check/{elementId}")
    public ResponseEntity<Boolean> checkIfElementIsFavoritedByUser(@PathVariable Long elementId){
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body(false);
        }
        boolean isFavorited = favoritesService.isElementFavorited(user.getId(), elementId);
        return ResponseEntity.ok(isFavorited);
    }
}

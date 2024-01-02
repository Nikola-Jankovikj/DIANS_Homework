package mk.ukim.finki.treasuredroutes.Web;

import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<List<Element>> getUserFavorites(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        System.out.println("SESSIONID:" + request.getSession().getId());
        List<Element> userFavorites = favoritesService.getUserFavorites(user.getId());
        return ResponseEntity.ok(userFavorites);
    }

    @PutMapping()
    public ResponseEntity<String> addToFavorites(@RequestBody Map<String, Long> requestBody,
                                                 HttpServletRequest request) {
        Long elementId = requestBody.get("objectId");
        User user = (User) request.getSession().getAttribute("user");
        favoritesService.addToFavorites(user.getId(), elementId);
        return ResponseEntity.ok("Added to favorites");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFromFavorites(@RequestBody Map<String, Long> requestBody,
                                                      HttpServletRequest request) {
        Long elementId = requestBody.get("objectId");
        User user = (User) request.getSession().getAttribute("user");
        favoritesService.removeFromFavorites(user.getId(), elementId);
        return ResponseEntity.ok("Added to favorites");
    }

    @GetMapping("/check/{elementId}")
    public ResponseEntity<Boolean> checkIfElementIsFavoritedByUser(@PathVariable Long elementId,
                                                                   HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");
        boolean isFavorited = favoritesService.isElementFavorited(user.getId(), elementId);
        return ResponseEntity.ok(isFavorited);
    }
}

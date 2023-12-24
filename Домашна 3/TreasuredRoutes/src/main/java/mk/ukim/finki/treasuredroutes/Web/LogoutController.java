package mk.ukim.finki.treasuredroutes.Web;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/logout")
public class LogoutController {
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> logout() {
        // Log out the currently authenticated user
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("{\"info\": \"Logout successful\"}");
    }
}

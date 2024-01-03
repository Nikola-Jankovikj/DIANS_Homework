package mk.ukim.finki.treasuredroutes.Web;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/logout")
public class LogoutController {

    @GetMapping
    public ResponseEntity<String > logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("{\"info\": \"Logout successful\"}");
    }
}

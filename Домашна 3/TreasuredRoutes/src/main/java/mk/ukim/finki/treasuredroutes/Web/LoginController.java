package mk.ukim.finki.treasuredroutes.Web;

import jakarta.servlet.http.HttpServletRequest;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.InvalidArgumentsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.InvalidUserCredentialsException;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/login")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> login(@RequestParam String email,
                                        @RequestParam String password,
                                        HttpServletRequest request) {
        try {
            User user = userService.login(email, password);
            request.getSession().setAttribute("user", user);
            System.out.println("SESSION ID" + request.getSession().getId());
            return ResponseEntity.ok("{\"info\": \"Login successful\"}");
        } catch (InvalidArgumentsException | InvalidUserCredentialsException e) {
            return ResponseEntity.badRequest().body("{\"info\":  \""+ e.getMessage() + "\"}");
        }

    }
}

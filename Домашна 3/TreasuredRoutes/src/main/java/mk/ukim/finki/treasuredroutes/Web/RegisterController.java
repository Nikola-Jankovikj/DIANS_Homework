package mk.ukim.finki.treasuredroutes.Web;

import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailAlreadyExistsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.InvalidArgumentsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.PasswordsDoNotMatchException;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/register")
public class RegisterController {

    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> register(@RequestParam String email,
                                           @RequestParam String password,
                                           @RequestParam String confirmPassword) {
        try {
            userService.register(email, password, confirmPassword);
            return ResponseEntity.ok("{\"info\": \"Registered\"}");
        } catch (InvalidArgumentsException | EmailAlreadyExistsException | PasswordsDoNotMatchException e) {
            return ResponseEntity.badRequest().body("{\"info\":  \""+ e.getMessage() + "\"}");
        }
    }
}

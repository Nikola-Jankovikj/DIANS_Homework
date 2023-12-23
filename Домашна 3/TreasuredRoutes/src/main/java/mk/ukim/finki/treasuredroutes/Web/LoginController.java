package mk.ukim.finki.treasuredroutes.Web;


import mk.ukim.finki.treasuredroutes.Model.Exceptions.InvalidArgumentsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.InvalidUserCredentialsException;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Service.AuthService;
import mk.ukim.finki.treasuredroutes.Web.dto.UserRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/login")
public class LoginController {

    private final AuthService authService;

    public LoginController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> loginUser (@RequestBody UserRequest loginRequest) {

        User user = null;

        try {
            user = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
        } catch (InvalidUserCredentialsException | InvalidArgumentsException exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        }

        return ResponseEntity.ok("{\"info\": \"Login successful\"}");
    }
}

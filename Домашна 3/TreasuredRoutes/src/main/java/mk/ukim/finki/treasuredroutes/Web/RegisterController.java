package mk.ukim.finki.treasuredroutes.Web;


import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailAlreadyExistsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.InvalidArgumentsException;
import mk.ukim.finki.treasuredroutes.Service.AuthService;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import mk.ukim.finki.treasuredroutes.Web.dto.UserRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/register")
public class RegisterController {

    private final AuthService authService;
    private final UserService userService;

    public RegisterController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerUser (@RequestBody UserRequest registerRequest) {

        try {
            this.userService.register(registerRequest.getEmail(), registerRequest.getPassword());
        } catch (InvalidArgumentsException | EmailAlreadyExistsException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }

        return ResponseEntity.ok("{\"info\": \"Registration successful\"}");
    }
}

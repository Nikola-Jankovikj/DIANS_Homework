package mk.ukim.finki.treasuredroutes.auth;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailAlreadyExistsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.InvalidArgumentsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.PasswordsDoNotMatchException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(service.register(request));
        } catch (InvalidArgumentsException | PasswordsDoNotMatchException | EmailAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(new AuthenticationResponse(e.getMessage()));
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            return ResponseEntity.ok(service.authenticate(request));
        } catch (InvalidArgumentsException | AuthenticationException e ) {
            return ResponseEntity.badRequest().body(new AuthenticationResponse(e.getMessage()));
        }
    }
}

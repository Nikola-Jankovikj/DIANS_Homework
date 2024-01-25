package mk.ukim.finki.authuserservice.web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.authuserservice.model.AuthenticationRequest;
import mk.ukim.finki.authuserservice.model.AuthenticationResponse;
import mk.ukim.finki.authuserservice.model.RegisterRequest;
import mk.ukim.finki.authuserservice.model.exceptions.EmailAlreadyExistsException;
import mk.ukim.finki.authuserservice.model.exceptions.EmailDoesNotExist;
import mk.ukim.finki.authuserservice.model.exceptions.InvalidArgumentsException;
import mk.ukim.finki.authuserservice.model.exceptions.PasswordsDoNotMatchException;
import mk.ukim.finki.authuserservice.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
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

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out");
    }

    @GetMapping("/authUser")
    public ResponseEntity<Long> getAuthUserId() {
        try {
            Long userId = service.getAuthenticatedUser().getId();
            return ResponseEntity.ok(userId);
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body(10L);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> checkHealth(){
        return ResponseEntity.ok("It is ok");
    }
}

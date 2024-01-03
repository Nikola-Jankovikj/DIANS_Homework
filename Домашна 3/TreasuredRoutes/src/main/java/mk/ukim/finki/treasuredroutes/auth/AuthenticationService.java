package mk.ukim.finki.treasuredroutes.auth;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.treasuredroutes.Config.JwtService;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailAlreadyExistsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailDoesNotExist;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.InvalidArgumentsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.PasswordsDoNotMatchException;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) throws InvalidArgumentsException, PasswordsDoNotMatchException, EmailAlreadyExistsException {
        String email = request.getEmail();
        String password = request.getPassword();
        String confirmPassword = request.getConfirmPassword();
        if (email == null || password == null || email.isBlank() || password.isBlank()) {
            throw new InvalidArgumentsException();
        }
        if (!password.equals(confirmPassword)) {
            throw new PasswordsDoNotMatchException();
        }
        if(this.userRepository.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExistsException();
        }

        var user = new User(request.getEmail(), passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws InvalidArgumentsException{
        String email = request.getEmail();
        String password = request.getPassword();
        if (email == null || password == null || email.isBlank() || password.isBlank()) {
            throw new InvalidArgumentsException();
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(email).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public User getAuthenticatedUser() throws EmailDoesNotExist {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        return userRepository.findByEmail(email).orElseThrow(EmailDoesNotExist::new);
    }
}

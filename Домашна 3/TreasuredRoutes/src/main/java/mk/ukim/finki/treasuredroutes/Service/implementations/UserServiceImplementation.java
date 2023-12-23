package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailAlreadyExistsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.InvalidArgumentsException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.UserNotFoundException;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.UserRepository;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImplementation(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findById(Long id) throws UsernameNotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException(""));
    }

    @Override
    public User register(String email, String password) {
        if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
            throw new InvalidArgumentsException();
        }

        if(this.userRepository.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExistsException(email);
        }

        User user = new User(
                email,
                passwordEncoder.encode(password)
        );

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException(email));
    }
}

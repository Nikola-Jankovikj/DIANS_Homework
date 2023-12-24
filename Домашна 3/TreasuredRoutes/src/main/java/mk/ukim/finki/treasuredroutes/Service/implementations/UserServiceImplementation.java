package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Exceptions.*;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.UserRepository;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;

    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findById(Long id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public User login(String email, String password) throws InvalidArgumentsException, InvalidUserCredentialsException {
        if (email == null || password == null || email.isBlank() || password.isBlank()) {
            throw new InvalidArgumentsException();
        }

        return userRepository.findByEmailAndPassword(email, password)
                .orElseThrow(InvalidUserCredentialsException::new);
    }


    @Override
    public User register(String email, String password, String confirmPassword) throws InvalidArgumentsException, PasswordsDoNotMatchException, EmailAlreadyExistsException {
        if (email == null || password == null || email.isBlank() || password.isBlank()) {
            throw new InvalidArgumentsException();
        }

        if (!password.equals(confirmPassword)) {
            throw new PasswordsDoNotMatchException();
        }

        if(this.userRepository.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExistsException();
        }

        User user = new User(email, password);
        return userRepository.save(user);
    }


}

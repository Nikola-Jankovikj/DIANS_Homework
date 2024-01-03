package mk.ukim.finki.treasuredroutes.Service.implementations;


import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailInUseException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.UserNotFoundException;

import mk.ukim.finki.treasuredroutes.Model.Exceptions.*;

import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.UserRepository;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImplementation(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> users() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    @Override

    public User changeEmailAddress(String newEmail, Long id) throws UserNotFoundException, EmailInUseException {
        User user = userRepository.findByEmail(newEmail).orElse(null);

        if (user!=null) {
            throw new EmailInUseException("Email already in use by another user");
        }

        User updatedUser = findById(id);
        if (updatedUser.getEmail().equals(newEmail)) {
            throw new EmailInUseException("The provided email is the same as the current email");
        }

        updatedUser.setEmail(newEmail);
        return userRepository.save(updatedUser);
    }

    @Override
    public User findByEmail(String email) throws EmailDoesNotExist {
        return userRepository.findByEmail(email).orElseThrow(EmailDoesNotExist::new);
    }

    @Override
    public User changePassword(String newPassword, Long id) throws UserNotFoundException{
        User user = findById(id);
        newPassword = passwordEncoder.encode(newPassword);
        user.setPassword(newPassword);
        return userRepository.save(user);
    }
}

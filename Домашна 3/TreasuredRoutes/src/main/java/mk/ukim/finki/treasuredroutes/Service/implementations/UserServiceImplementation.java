package mk.ukim.finki.treasuredroutes.Service.implementations;


import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailInUseException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.UserNotFoundException;

import mk.ukim.finki.treasuredroutes.Model.Exceptions.*;

import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.UserRepository;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;

    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    public User changeEmailAddress(String newEmail, Long id) throws UserNotFoundException, EmailInUseException, EmailDoesNotExist {
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

//    @Override
//    public void setProfilePicture(String picturePath, Long id) throws UserNotFoundException {
//        User updatedUser = findById(id);
//        updatedUser.setProfilePicture("images/"+picturePath);
//        userRepository.save(updatedUser);
//
//    }
    @Override
    public User changePassword(String newPassword, Long id) throws UserNotFoundException, EmailInUseException{
        User user = findById(id);

        user.setPassword(newPassword);
        return userRepository.save(user);
    }

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

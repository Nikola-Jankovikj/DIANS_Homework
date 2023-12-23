package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailInUseException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.UserNotFoundException;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.UserRepository;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public User changeEmailAddress(String newEmail, Long id) throws UserNotFoundException, EmailInUseException {
        List<User> usersWithEmail = findByEmail(newEmail);

        if (!usersWithEmail.isEmpty() && !usersWithEmail.get(0).getId().equals(id)) {
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
    public List<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void setProfilePicture(String picturePath, Long id) throws UserNotFoundException {
        User updatedUser = findById(id);
        updatedUser.setProfilePicture("images/"+picturePath);
        userRepository.save(updatedUser);

    }
    @Override
    public User changePassword(String newPassword, Long id) throws UserNotFoundException, EmailInUseException{
        User user = findById(id);

        user.setPassword(newPassword);
        return userRepository.save(user);
    }
}

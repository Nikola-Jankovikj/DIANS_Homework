package mk.ukim.finki.treasuredroutes.Service;


import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailInUseException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.UserNotFoundException;

import mk.ukim.finki.treasuredroutes.Model.Exceptions.*;

import mk.ukim.finki.treasuredroutes.Model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> users();
    User findById(Long id) throws UserNotFoundException;


    User changeEmailAddress(String newEmail, Long id) throws UserNotFoundException, EmailInUseException, EmailDoesNotExist;

    User findByEmail(String email) throws EmailDoesNotExist;

    void setProfilePicture(String picturePath, Long id) throws UserNotFoundException;

    User changePassword(String newPassword, Long id) throws UserNotFoundException, EmailInUseException;


    User login(String email, String password) throws InvalidArgumentsException, InvalidUserCredentialsException;
    User register(String email, String password, String confirmPassword) throws InvalidArgumentsException, PasswordsDoNotMatchException, EmailAlreadyExistsException;

}

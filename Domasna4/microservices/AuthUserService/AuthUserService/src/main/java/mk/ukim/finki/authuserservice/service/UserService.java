package mk.ukim.finki.authuserservice.service;


import mk.ukim.finki.authuserservice.model.User;
import mk.ukim.finki.authuserservice.model.exceptions.EmailDoesNotExist;
import mk.ukim.finki.authuserservice.model.exceptions.EmailInUseException;
import mk.ukim.finki.authuserservice.model.exceptions.UserNotFoundException;

import java.util.List;

public interface UserService {

    List<User> users();
    User findById(Long id) throws UserNotFoundException;


    User changeEmailAddress(String newEmail, Long id) throws UserNotFoundException, EmailInUseException, EmailDoesNotExist;

    User findByEmail(String email) throws EmailDoesNotExist;

    User changePassword(String newPassword, Long id) throws UserNotFoundException, EmailInUseException;
}

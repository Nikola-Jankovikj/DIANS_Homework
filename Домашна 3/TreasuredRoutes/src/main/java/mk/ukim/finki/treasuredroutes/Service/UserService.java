package mk.ukim.finki.treasuredroutes.Service;

import mk.ukim.finki.treasuredroutes.Model.Exceptions.*;
import mk.ukim.finki.treasuredroutes.Model.User;

public interface UserService {
    User findById(Long id) throws UserNotFoundException;
    User login(String email, String password) throws InvalidArgumentsException, InvalidUserCredentialsException;
    User register(String email, String password, String confirmPassword) throws InvalidArgumentsException, PasswordsDoNotMatchException, EmailAlreadyExistsException;
}

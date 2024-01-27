package mk.ukim.finki.authuserservice.service;

import mk.ukim.finki.authuserservice.model.AuthenticationRequest;
import mk.ukim.finki.authuserservice.model.AuthenticationResponse;
import mk.ukim.finki.authuserservice.model.RegisterRequest;
import mk.ukim.finki.authuserservice.model.User;
import mk.ukim.finki.authuserservice.model.exceptions.EmailAlreadyExistsException;
import mk.ukim.finki.authuserservice.model.exceptions.EmailDoesNotExist;
import mk.ukim.finki.authuserservice.model.exceptions.InvalidArgumentsException;
import mk.ukim.finki.authuserservice.model.exceptions.PasswordsDoNotMatchException;

public interface AuthenticationService {
    public AuthenticationResponse register(RegisterRequest request) throws InvalidArgumentsException, PasswordsDoNotMatchException, EmailAlreadyExistsException;
    public AuthenticationResponse authenticate(AuthenticationRequest request) throws InvalidArgumentsException;
    public User getAuthenticatedUser() throws EmailDoesNotExist;
}

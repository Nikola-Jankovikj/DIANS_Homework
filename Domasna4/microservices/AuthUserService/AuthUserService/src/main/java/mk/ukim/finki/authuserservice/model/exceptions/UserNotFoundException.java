package mk.ukim.finki.authuserservice.model.exceptions;

public class UserNotFoundException extends Exception{
    public UserNotFoundException() {
        super("User not found.");
    }
}

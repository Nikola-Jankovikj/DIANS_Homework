package mk.ukim.finki.treasuredroutes.Model.Exceptions;

public class UserNotFoundException extends Exception{
    public UserNotFoundException() {
        super("User not found.");
    }
}

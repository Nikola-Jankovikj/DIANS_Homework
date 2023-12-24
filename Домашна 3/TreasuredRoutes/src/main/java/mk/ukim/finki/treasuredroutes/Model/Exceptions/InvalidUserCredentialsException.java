package mk.ukim.finki.treasuredroutes.Model.Exceptions;

public class InvalidUserCredentialsException extends Exception{
    public InvalidUserCredentialsException() {
        super("Invalid email or password!");
    }
}

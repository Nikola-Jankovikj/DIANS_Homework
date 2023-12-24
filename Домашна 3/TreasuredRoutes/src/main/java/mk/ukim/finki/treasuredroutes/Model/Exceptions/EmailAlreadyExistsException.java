package mk.ukim.finki.treasuredroutes.Model.Exceptions;

public class EmailAlreadyExistsException extends Exception{
    public EmailAlreadyExistsException() {
        super("Email already exists!");
    }
}

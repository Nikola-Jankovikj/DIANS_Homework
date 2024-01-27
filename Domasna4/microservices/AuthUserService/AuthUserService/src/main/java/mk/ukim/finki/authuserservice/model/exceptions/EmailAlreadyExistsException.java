package mk.ukim.finki.authuserservice.model.exceptions;

public class EmailAlreadyExistsException extends Exception{
    public EmailAlreadyExistsException() {
        super("Email already exists!");
    }
}

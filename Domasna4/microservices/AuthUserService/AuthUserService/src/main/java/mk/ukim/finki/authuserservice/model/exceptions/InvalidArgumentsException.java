package mk.ukim.finki.authuserservice.model.exceptions;

public class InvalidArgumentsException extends Exception{
    public InvalidArgumentsException() {
        super("All fields are required!");
    }
}

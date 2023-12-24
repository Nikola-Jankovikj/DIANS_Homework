package mk.ukim.finki.treasuredroutes.Model.Exceptions;

public class InvalidArgumentsException extends Exception{
    public InvalidArgumentsException() {
        super("All fields are required!");
    }
}

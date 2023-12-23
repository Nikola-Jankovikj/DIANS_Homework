package mk.ukim.finki.treasuredroutes.Model.Exceptions;

public class EmailAlreadyExistsException extends RuntimeException{

    public EmailAlreadyExistsException(String email) {
        super(String.format("User with username: %s already exists", email));
    }
}



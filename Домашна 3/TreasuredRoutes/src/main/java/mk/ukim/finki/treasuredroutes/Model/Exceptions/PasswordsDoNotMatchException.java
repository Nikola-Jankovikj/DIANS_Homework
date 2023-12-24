package mk.ukim.finki.treasuredroutes.Model.Exceptions;

public class PasswordsDoNotMatchException extends Exception {
    public PasswordsDoNotMatchException() {
        super("Passwords do not match!");
    }
}

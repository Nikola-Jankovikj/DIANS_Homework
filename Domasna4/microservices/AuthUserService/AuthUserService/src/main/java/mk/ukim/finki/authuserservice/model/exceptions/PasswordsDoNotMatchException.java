package mk.ukim.finki.authuserservice.model.exceptions;

public class PasswordsDoNotMatchException extends Exception {
    public PasswordsDoNotMatchException() {
        super("Passwords do not match!");
    }
}

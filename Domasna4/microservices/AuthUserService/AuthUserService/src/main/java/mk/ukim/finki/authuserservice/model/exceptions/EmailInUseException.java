package mk.ukim.finki.authuserservice.model.exceptions;

public class EmailInUseException extends Exception {
    public EmailInUseException(String s) {
        super(s);
    }
}

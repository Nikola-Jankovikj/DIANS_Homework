package mk.ukim.finki.authuserservice.model.exceptions;

public class EmailDoesNotExist extends Exception{
    public EmailDoesNotExist(){
        super("Email does not exist!");
    }
}

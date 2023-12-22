package mk.ukim.finki.treasuredroutes.Model.Exceptions;

public class ElementNotFoundException extends RuntimeException{
    public ElementNotFoundException(Long id) {
        super(String.format("Element with id %d was not found", id));
    }
}

package mk.ukim.finki.elementservice.model.exceptions;

public class ElementNotFoundException extends RuntimeException{
    public ElementNotFoundException(Long id) {
        super(String.format("Element with id %d was not found", id));
    }
}

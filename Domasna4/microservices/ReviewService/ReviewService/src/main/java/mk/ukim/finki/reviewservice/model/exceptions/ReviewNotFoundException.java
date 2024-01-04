package mk.ukim.finki.reviewservice.model.exceptions;

public class ReviewNotFoundException extends Exception{
    public ReviewNotFoundException() {
        super("Review not found");
    }
}

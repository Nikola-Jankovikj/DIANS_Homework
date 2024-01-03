package mk.ukim.finki.treasuredroutes.Model.Exceptions;

public class ReviewNotFoundException extends Exception{
    public ReviewNotFoundException() {
        super("Review not found");
    }
}

package mk.ukim.finki.homework1.classes.filters;

public interface Filter<T> {
    T execute(T inputLine);
}

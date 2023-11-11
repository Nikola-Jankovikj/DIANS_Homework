package mk.ukim.finki.homework1.classes.pipe;

import mk.ukim.finki.homework1.classes.filters.Filter;

import java.util.ArrayList;
import java.util.List;

public class Pipe<T>{

    private final List<Filter<T>> filterList;

    public Pipe() {
        this.filterList = new ArrayList<>();
    }

    public void addFilter(Filter<T> other) {
        this.filterList.add(other);
    }

    public T runFilter(T inputLine) {
        for(Filter<T> f : this.filterList) {
            inputLine = f.execute(inputLine);
        }

        return inputLine;
    }
}
package mk.ukim.finki.homework1.classes.filters;

import mk.ukim.finki.homework1.classes.elements.Element;

public class NameFilter implements Filter<Element> {
    @Override
    public Element execute(Element element) {
        if (element == null) {
            return null;
        }
        if (element.getName().isEmpty()) {
            return null;
        }
        return element;
    }
}

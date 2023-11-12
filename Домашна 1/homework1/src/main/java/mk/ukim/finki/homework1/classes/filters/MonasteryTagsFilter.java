package mk.ukim.finki.homework1.classes.filters;

import mk.ukim.finki.homework1.classes.elements.Element;

public class MonasteryTagsFilter implements Filter<Element> {
    @Override
    public Element execute(Element element) {
        if (element == null) return null;
        if (element.getAmenity().equals("monastery") ||
                element.getTourism().equals("monastery") ||
                element.getHistoric().equals("monastery") ||
                element.getName().toLowerCase().contains("monastery") ||
                element.getName().toLowerCase().contains("манастир")) {
            element.setType("Манастир");
            return element;
        }
        return null;
    }
}

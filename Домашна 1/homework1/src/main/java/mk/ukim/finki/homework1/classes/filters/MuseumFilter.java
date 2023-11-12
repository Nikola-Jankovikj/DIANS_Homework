package mk.ukim.finki.homework1.classes.filters;

import mk.ukim.finki.homework1.classes.elements.Element;

public class MuseumFilter implements Filter<Element> {
    @Override
    public Element execute(Element element) {
        if (element.getAmenity().equals("museum") ||
        element.getTourism().equals("museum") ||
        element.getHistoric().equals("museum") ||
        element.getName().toLowerCase().contains("museum") ||
        element.getName().toLowerCase().contains("музеј")) {
            element.setType("Музеј");
            return element;
        }
        return null;
    }
}

package mk.ukim.finki.homework1.classes.filters;

import mk.ukim.finki.homework1.classes.elements.Element;

public class MonasteryReligionFilter implements Filter<Element> {
    @Override
    public Element execute(Element element) {
        if ((element.getAmenity().equals("place_of_worship") && !element.getReligion().equals("christian"))) return null;
        return element;
    }
}

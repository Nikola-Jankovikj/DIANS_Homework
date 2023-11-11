package mk.ukim.finki.homework1.classes.filters;

import mk.ukim.finki.homework1.classes.elements.Element;

public class FilterAmenityAndTourism implements Filter<Element> {
    @Override
    public Element execute(Element element) {
        if(element.getAmenity().equals("archaeological_site") ||
                element.getAmenity().equals("museum") ||
                element.getAmenity().equals("monastery") ||
                element.getAmenity().equals("place_of_worship") ||
                element.getTourism().equals("museum")) {return  element;}
        return null;
    }
}

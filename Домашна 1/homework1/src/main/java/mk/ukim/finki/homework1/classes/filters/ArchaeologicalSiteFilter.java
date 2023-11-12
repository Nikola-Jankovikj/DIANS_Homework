package mk.ukim.finki.homework1.classes.filters;

import mk.ukim.finki.homework1.classes.elements.Element;

public class ArchaeologicalSiteFilter implements Filter<Element> {

    @Override
    public Element execute(Element element) {
        if (element.getAmenity().equals("archaeological_site") ||
        element.getHistoric().equals("archaeological_site")) {
            element.setType("Археолошки локалитет");
            return element;
        }
        return null;
    }
}

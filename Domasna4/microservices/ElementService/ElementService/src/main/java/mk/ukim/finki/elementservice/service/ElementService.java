package mk.ukim.finki.elementservice.service;


import mk.ukim.finki.elementservice.model.Element;

import java.util.List;

public interface ElementService {
    public List<Element> findAll();
    public Element findById(Long id);
    public Element findByStringId(String id);

    public List<Element> findMuseums();
    public List<Element> findArchaeologicalSites();
    public List<Element> findMonasteries();

    List<Element> searchPlaces(String place);

    List<Element> findByName(String name);

    Element addUserLocation(Double latitude, Double longitude);

    List<Element> findAllById(List<Long> ids);

}

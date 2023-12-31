package mk.ukim.finki.treasuredroutes.Service;

import mk.ukim.finki.treasuredroutes.Model.Element;
import org.springframework.http.HttpStatusCode;

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

}

package mk.ukim.finki.treasuredroutes.Service;

import mk.ukim.finki.treasuredroutes.Model.Element;

import java.util.List;

public interface ElementService {
    public List<Element> findAll();
    public Element findById(Long id);

    public List<Element> findMuseums();
    public List<Element> findArchaeologicalSites();
    public List<Element> findMonasteries();

}

package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.ElementNotFoundException;
import mk.ukim.finki.treasuredroutes.Repository.ElementRepository;
import mk.ukim.finki.treasuredroutes.Service.ElementService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ElementServiceImplementation implements ElementService {
    ElementRepository elementRepository;

    public ElementServiceImplementation(ElementRepository elementRepository) {
        this.elementRepository = elementRepository;
    }

    @Override
    public List<Element> findAll() {
        return elementRepository.findAll();
    }

    @Override
    public Element findById(Long id) {
        return elementRepository.findById(id).orElseThrow(() -> new ElementNotFoundException(id));
    }

    @Override
    public List<Element> findMuseums() {
        return elementRepository.findAll().stream().filter(element -> element.getType().strip().toLowerCase().equals("музеј")).collect(Collectors.toList());
    }

    @Override
    public List<Element> findArchaeologicalSites() {
        return elementRepository.findAll().stream().filter(element -> element.getType().strip().toLowerCase().equals("археолошки локалитет")).collect(Collectors.toList());
    }

    @Override
    public List<Element> findMonasteries() {
        return elementRepository.findAll().stream().filter(element -> element.getType().strip().toLowerCase().equals("манастир")).collect(Collectors.toList());
    }
}

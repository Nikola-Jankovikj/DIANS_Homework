package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.ElementNotFoundException;
import mk.ukim.finki.treasuredroutes.Repository.ElementRepository;
import mk.ukim.finki.treasuredroutes.Service.ElementService;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

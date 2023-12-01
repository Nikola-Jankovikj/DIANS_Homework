package mk.ukim.finki.treasuredroutes.Web;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Service.ElementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Validated
@CrossOrigin(origins="*")
public class ElementController {
    private final ElementService elementService;

    public ElementController(ElementService elementService) {
        this.elementService = elementService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Element>> findAll(){
        return new ResponseEntity<>(elementService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Element> findById(@PathVariable Long id){
        return new ResponseEntity<>(elementService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/monasteries")
    public ResponseEntity<List<Element>> findMonasteries(){
        return new ResponseEntity<>(elementService.findMonasteries(), HttpStatus.OK);
    }

    @GetMapping("/archaeologicalSites")
    public ResponseEntity<List<Element>> findArchaeologicalSites(){
        return new ResponseEntity<>(elementService.findArchaeologicalSites(), HttpStatus.OK);
    }

    @GetMapping("/museums")
    public ResponseEntity<List<Element>> findMuseums(){
        return new ResponseEntity<>(elementService.findMuseums(), HttpStatus.OK);
    }


}

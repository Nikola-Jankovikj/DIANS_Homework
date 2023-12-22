package mk.ukim.finki.treasuredroutes.Web;


import mk.ukim.finki.treasuredroutes.Model.Exceptions.UserNotFoundException;
import mk.ukim.finki.treasuredroutes.Service.ElementService;
import mk.ukim.finki.treasuredroutes.Service.RouteService;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/route")
public class RouteController {

    private final RouteService routeService;
    private final UserService userService;
    private final ElementService elementService;

    public RouteController(RouteService routeService, UserService userService, ElementService elementService) {
        this.routeService = routeService;
        this.userService = userService;
        this.elementService = elementService;
    }

    @GetMapping("/add")
    public String addRoute() throws UserNotFoundException {
        routeService.generateRoute(userService.findById(1L), elementService.findByStringId("4430657931"));
        routeService.generateRoute(userService.findById(1L), elementService.findByStringId("2480929515"));
        routeService.generateRoute(userService.findById(1L), elementService.findByStringId("7512268453"));
        routeService.generateRoute(userService.findById(2L), elementService.findByStringId("2480929515"));
        routeService.generateRoute(userService.findById(2L), elementService.findByStringId("7512268453"));
        return null;
    }
}

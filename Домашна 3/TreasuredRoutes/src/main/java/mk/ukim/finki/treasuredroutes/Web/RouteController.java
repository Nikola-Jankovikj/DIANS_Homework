package mk.ukim.finki.treasuredroutes.Web;


import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.UserNotFoundException;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Service.ElementService;
import mk.ukim.finki.treasuredroutes.Service.RouteService;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/add2")
    public ResponseEntity<String> addRoute(@RequestBody Map<String, String> requestBody) {
        try {
            String siteId = requestBody.get("siteId");
            System.out.println(siteId);
            System.out.println(elementService.findByStringId(siteId));
            routeService.generateRoute(userService.findById(1L), elementService.findByStringId(siteId));
            return ResponseEntity.ok("Site added to the route successfully.");
        } catch (Exception e) {
            System.out.println("problem imame");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add site to the route.");
        }
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Element> getRoutes() throws UserNotFoundException {
        System.out.println("Ej23");
        User user = userService.findById(1L); // Change the user ID as needed
        System.out.println("Returns: " + routeService.getRouteByUser(user));
        return routeService.getRouteByUser(user);
    }

    @DeleteMapping("/delete/{siteId}")
    public ResponseEntity<String> deleteSiteFromRoute(@PathVariable String siteId) {

        try {
            System.out.println("Ej");
            routeService.deleteSite(userService.findById(1L), siteId);
            return ResponseEntity.ok("Site deleted from the route successfully");
        } catch (Exception e) {
            // Handle exceptions, log errors, and return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete site from the route");
        }
    }

}

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



    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<Element>> getRoute() throws UserNotFoundException {
        User user = userService.findById(1L); // Change the user ID as needed
        List<Element> routeSites = routeService.getSortedSitesToVisit(user);
        System.out.println("LENGTH" + routeSites.size());

        if (routeSites.get(0) == null) {
            System.out.println("EMPTY ");
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(routeSites);
        }
    }

    @DeleteMapping("/delete/{siteId}")
    public ResponseEntity<String> deleteSiteFromRoute(@PathVariable String siteId) {

        try {
            User user = userService.findById(1L);
            routeService.deleteSite(userService.findById(1L), siteId);

            return ResponseEntity.ok("Site deleted from the route successfully");
        } catch (Exception e) {
            // Handle exceptions, log errors, and return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete site from the route");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addSiteToRoute(@RequestBody Map<String, String> requestBody) {
        try {
            String siteId = requestBody.get("siteId");
            System.out.println(siteId);
            System.out.println(elementService.findByStringId(siteId));
            routeService.generateRouteTSP(userService.findById(1L), elementService.findByStringId(siteId));
            return ResponseEntity.ok("Site added to the route successfully.");
        } catch (Exception e) {
            System.out.println("problem imame");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add site to the route.");
        }
    }

}

package mk.ukim.finki.treasuredroutes.Service;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Route;
import mk.ukim.finki.treasuredroutes.Model.User;

import java.util.List;

public interface RouteService {
    Route getByUser(User user);
    List<Element> generateRoute(User user, Element newSIte);
    Route createRouteForUser(User user);

    List<Element> getRouteByUser(User user);

    void deleteSite(User user, String siteId);

}

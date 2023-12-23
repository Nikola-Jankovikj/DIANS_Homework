package mk.ukim.finki.treasuredroutes.Service;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Route;
import mk.ukim.finki.treasuredroutes.Model.User;

import java.util.List;

public interface RouteService {
    Route getByUser(User user);
    Route createRouteForUser(User user);

    List<Element> getSortedSitesToVisit(User user);

    void deleteSite(User user, String siteId);
    List<Element> generateRouteTSP(User user, Element newSite);

}

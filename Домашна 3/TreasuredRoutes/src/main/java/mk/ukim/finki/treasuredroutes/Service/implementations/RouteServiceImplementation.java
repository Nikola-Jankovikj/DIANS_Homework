package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Route;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.ElementRepository;
import mk.ukim.finki.treasuredroutes.Repository.RouteRepository;
import mk.ukim.finki.treasuredroutes.Service.ElementService;
import mk.ukim.finki.treasuredroutes.Service.LastAddedSiteService;
import mk.ukim.finki.treasuredroutes.Service.RouteService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteServiceImplementation implements RouteService {

    private final RouteRepository routeRepository;
    private final ElementRepository elementRepository;
    private final LastAddedSiteService lastAddedSiteService;
    private final ElementService elementService;

    public RouteServiceImplementation(RouteRepository routeRepository, ElementRepository elementRepository, LastAddedSiteService lastAddedSiteService, ElementService elementService) {
        this.routeRepository = routeRepository;
        this.elementRepository = elementRepository;


        this.lastAddedSiteService = lastAddedSiteService;
        this.elementService = elementService;
    }

    @Override
    public Route getByUser(User user) {
        if(routeRepository.findRouteByUserOfRoute(user) == null) createRouteForUser(user);
        return routeRepository.findRouteByUserOfRoute(user);
    }

    @Override
    public List<Element> generateRoute(User user, Element newSite) {
        Route routeElement = getByUser(user);
        List<Element> route = new ArrayList<>();
        route.add(routeElement.getStartingLocation());
        if(routeElement.getRouteSites()!=null)
            route.addAll(routeElement.getRouteSites());

//        if (routeElement.getRouteSites() != null) {
//            route = new ArrayList<>(routeElement.getRouteSites());
//        } else {
//            route = new ArrayList<>();
//        }

        List<Element> routeForDatabase = new ArrayList<>(route);

        if (newSite != null && !route.contains(newSite)) {
            // Find the closest neighbor for the new site
            Element closestNeighbor = findClosestNeighbor(routeElement.getStartingLocation(), route, newSite);

            // Insert the new site after the closest neighbor
            if (closestNeighbor != null) {
                route.add(route.indexOf(closestNeighbor) + 1, newSite);
                lastAddedSiteService.setLastAddedSite(user.getId(), newSite);
            } else {
                // If no closest neighbor found, insert at the beginning
                route.add(0, newSite);
                lastAddedSiteService.setLastAddedSite(user.getId(), newSite);
            }


            routeForDatabase.add(newSite);
        }




        System.out.println("This sorted?? " + routeForDatabase);
        if (routeElement.getRouteSites() != null) {
            routeElement.getRouteSites().clear();
        }

        route.remove(routeElement.getStartingLocation());
        routeElement.setRouteSites(route);
        routeRepository.save(routeElement);

        return route;
    }
    private Element findClosestNeighbor(Element startingLocation, List<Element> route, Element newSite) {
        double minDistance = Double.MAX_VALUE;
        Element closestNeighbor = null;

        for (Element site : route) {
            double distance = calculateDistance(newSite, site);
            if (distance < minDistance) {
                minDistance = distance;
                closestNeighbor = site;
            }
        }

        return closestNeighbor;
    }


    public Route createRouteForUser(User user) {
        Route newRoute = new Route();
        newRoute.setStartingLocation(elementRepository.getElementById("1831127085"));
        newRoute.setUserOfRoute(user);
        return routeRepository.save(newRoute);
    }

    @Override
    public List<Element> getRouteByUser(User user) {
        Route route = getByUser(user);
        System.out.println(route);
        List<Element> routeSites = new ArrayList<>();
        routeSites.add(route.getStartingLocation());
        if(route.getRouteSites()!=null)
            routeSites.addAll(route.getRouteSites());
        return routeSites;
    }

    @Override
    public void deleteSite(User user, String siteId) {
        Route routeToEdit = getByUser(user);
        Element siteToRemove = elementRepository.getElementById(siteId);
        if(routeToEdit.getStartingLocation().equals(siteToRemove)){
            routeToEdit.setStartingLocation(routeToEdit.getRouteSites().stream().toList().get(0));
            routeToEdit.getRouteSites().remove(routeToEdit.getRouteSites().stream().toList().get(0));
        }
        else{
            routeToEdit.getRouteSites().remove(siteToRemove);
        }
        routeRepository.save(routeToEdit);

    }


    private double calculateDistance(Element location1, Element location2) {

        double lat1 = Double.parseDouble(location1.getLat());
        double lon1 = Double.parseDouble(location1.getLon());
        double lat2 = Double.parseDouble(location2.getLat());
        double lon2 = Double.parseDouble(location2.getLon());

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Radius of the Earth (in kilometers)
        double earthRadius = 6371.0;

        // Calculate the distance
        return earthRadius * c;
    }




}

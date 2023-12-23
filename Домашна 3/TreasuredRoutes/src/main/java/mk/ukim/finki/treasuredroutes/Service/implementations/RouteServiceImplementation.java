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

    public RouteServiceImplementation(RouteRepository routeRepository, ElementRepository elementRepository, LastAddedSiteService lastAddedSiteService, ElementService elementService) {
        this.routeRepository = routeRepository;
        this.elementRepository = elementRepository;
    }

    @Override
    public Route getByUser(User user) {
        if(routeRepository.findRouteByUserOfRoute(user) == null) createRouteForUser(user);
        return routeRepository.findRouteByUserOfRoute(user);
    }

    public Route createRouteForUser(User user) {
        Route newRoute = new Route();
        newRoute.setStartingLocation(elementRepository.getElementById("1831127085"));
        newRoute.setUserOfRoute(user);
        return routeRepository.save(newRoute);
    }

    @Override
    public List<Element> getSortedSitesToVisit(User user) {
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
        boolean removingStartingLocation = routeToEdit.getStartingLocation().equals(siteToRemove);

        if(removingStartingLocation && routeToEdit.getRouteSites().isEmpty()){
            routeToEdit.setStartingLocation(null);
        }
        else if(removingStartingLocation){
            System.out.println("tuka!");
            Element newStartingLocation = routeToEdit.getRouteSites().stream().toList().get(0);
            System.out.println(newStartingLocation);
            routeToEdit.setStartingLocation(newStartingLocation);
            routeToEdit.getRouteSites().remove(newStartingLocation);
        }
        else{
            routeToEdit.getRouteSites().remove(siteToRemove);
        }

        generateRouteTSP(user, null);
        routeRepository.save(routeToEdit);

    }

    @Override
    public List<Element> generateRouteTSP(User user, Element newSite) {
        Route routeElement = getByUser(user);
        if(routeElement.getStartingLocation() == null){
            routeElement.setStartingLocation(newSite);
            routeRepository.save(routeElement);
        }
        List<Element> unvisitedSites = new ArrayList<>(routeElement.getRouteSites());

        if (newSite != null && !unvisitedSites.contains(newSite) && newSite != routeElement.getStartingLocation()) {
            unvisitedSites.add(newSite);
        }

        TSPAlgorithm tspAlgorithm = new TSPAlgorithm();
        List<Element> sortedRoute = tspAlgorithm.solveTSP(routeElement, unvisitedSites);
        System.out.println("TSP " + sortedRoute);


        routeElement.setRouteSites(sortedRoute.subList(1, sortedRoute.size()));
        routeRepository.save(routeElement);

        return sortedRoute;
    }

    public class TSPAlgorithm {

        public List<Element> solveTSP(Route routeElement, List<Element> unvisitedSites) {

            List<Element> route = new ArrayList<>();
            route.add(routeElement.getStartingLocation());


            while (!unvisitedSites.isEmpty()) {
                Element currentLocation = route.get(route.size() - 1);
                Element nextLocation = findClosestNeighborTSP(currentLocation, unvisitedSites);

                route.add(nextLocation);

                unvisitedSites.remove(nextLocation);
            }

            return route;
        }

        private Element findClosestNeighborTSP(Element currentLocation, List<Element> unvisitedSites){
            double minDistance = Double.MAX_VALUE;
            Element closestNeighbor = null;

            for (Element site : unvisitedSites) {
                double distance = calculateDistance(currentLocation, site);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestNeighbor = site;
                }
            }
            return closestNeighbor;
        }
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

        double earthRadius = 6371.0;

        return earthRadius * c;
    }




}

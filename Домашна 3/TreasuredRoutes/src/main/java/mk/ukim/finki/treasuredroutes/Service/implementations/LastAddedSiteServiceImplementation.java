package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Service.LastAddedSiteService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LastAddedSiteServiceImplementation implements LastAddedSiteService{

    private final Map<Long, Element> lastAddedSites;

    public LastAddedSiteServiceImplementation() {
        this.lastAddedSites = new HashMap<>();
    }

    public Element getLastAddedSite(Long userId) {
        return lastAddedSites.get(userId);
    }

    public void setLastAddedSite(Long userId, Element lastAddedSite) {
        lastAddedSites.put(userId, lastAddedSite);
    }
}


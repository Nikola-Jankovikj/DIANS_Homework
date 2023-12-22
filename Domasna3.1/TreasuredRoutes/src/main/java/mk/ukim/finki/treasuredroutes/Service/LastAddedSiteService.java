package mk.ukim.finki.treasuredroutes.Service;

import mk.ukim.finki.treasuredroutes.Model.Element;

import java.util.HashMap;

public interface LastAddedSiteService {

    public Element getLastAddedSite(Long userId);

    public void setLastAddedSite(Long userId, Element lastAddedSite);
}

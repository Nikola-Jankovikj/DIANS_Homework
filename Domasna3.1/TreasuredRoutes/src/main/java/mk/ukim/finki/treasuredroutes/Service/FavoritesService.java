package mk.ukim.finki.treasuredroutes.Service;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.User;

import java.util.List;

public interface FavoritesService {

    void addToFavorites(Long userId, Long elementId);
    void removeFromFavorites(Long userId, Long elementId);
    List<Element> getUserFavorites(Long userId);
}

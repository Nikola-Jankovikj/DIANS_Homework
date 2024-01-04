package mk.ukim.finki.favoriteservice.service;

import java.util.List;

public interface FavoritesService {

    void addToFavorites(Long userId, Long elementId);
    void removeFromFavorites(Long userId, Long elementId);
    List<Long> getUserFavorites(Long userId);
    boolean isElementFavorited(Long userId, Long elementId);

    Long authUserId(String authServiceName);
}

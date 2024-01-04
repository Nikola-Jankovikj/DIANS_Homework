package mk.ukim.finki.favoriteservice.service.implementation;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.favoriteservice.model.Favorite;
import mk.ukim.finki.favoriteservice.repository.FavoritesRepository;
import mk.ukim.finki.favoriteservice.service.FavoritesService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoritesServiceImplementation implements FavoritesService {
    private final FavoritesRepository favoritesRepository;

    @Override
    public void addToFavorites(Long userId, Long elementId) {
        Favorite favorite = new Favorite(userId, elementId);
        favoritesRepository.save(favorite);
    }

    @Override
    public void removeFromFavorites(Long userId, Long elementId) {
        Favorite favorite = favoritesRepository.findByUserIdAndElementId(userId, elementId);
        favoritesRepository.delete(favorite);
    }

    @Override
    public boolean isElementFavorited(Long userId, Long elementId) {
        Favorite favorite = favoritesRepository.findByUserIdAndElementId(userId, elementId);
        return favorite != null;
    }

    @Override
    public List<Long> getUserFavorites(Long userId) {
        List<Favorite> favorites = favoritesRepository.findByUserId(userId);
        return favorites.stream().map(Favorite::getElementId).collect(Collectors.toList());
    }
}

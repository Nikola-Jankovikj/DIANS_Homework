package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Favorite;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.ElementRepository;
import mk.ukim.finki.treasuredroutes.Repository.FavoritesRepository;
import mk.ukim.finki.treasuredroutes.Repository.UserRepository;
import mk.ukim.finki.treasuredroutes.Service.FavoritesService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoritesServiceImplementation implements FavoritesService {
    private final FavoritesRepository favoritesRepository;
    private final UserRepository userRepository;
    private final ElementRepository elementRepository;

    public FavoritesServiceImplementation(FavoritesRepository favoritesRepository, UserRepository userRepository, ElementRepository elementRepository) {
        this.favoritesRepository = favoritesRepository;
        this.userRepository = userRepository;
        this.elementRepository = elementRepository;
    }

    @Override
    public void addToFavorites(Long userId, Long elementId) {
        User user = userRepository.findById(userId).orElse(null);
        Element element = elementRepository.findById(elementId).orElse(null);
        Favorite favorite = new Favorite(user, element);
        favoritesRepository.save(favorite);
    }

    @Override
    public void removeFromFavorites(Long userId, Long elementId) {
        User user = userRepository.findById(userId).orElse(null);
        Element element = elementRepository.findById(elementId).orElse(null);
        Favorite favorite = favoritesRepository.findByUserAndElement(user, element);
        favoritesRepository.delete(favorite);
    }

    @Override
    public List<Element> getUserFavorites(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<Favorite> favorites = favoritesRepository.findByUser(user);
        return favorites.stream().map(Favorite::getElement).collect(Collectors.toList());
    }
}

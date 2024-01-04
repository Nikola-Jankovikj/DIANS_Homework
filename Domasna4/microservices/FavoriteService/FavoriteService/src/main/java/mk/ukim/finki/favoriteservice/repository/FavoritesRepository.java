package mk.ukim.finki.favoriteservice.repository;

import mk.ukim.finki.favoriteservice.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);
    Favorite findByUserIdAndElementId(Long userId, Long elementId);
}

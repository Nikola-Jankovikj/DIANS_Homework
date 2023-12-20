package mk.ukim.finki.treasuredroutes.Repository;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.Favorite;
import mk.ukim.finki.treasuredroutes.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);
    Favorite findByUserAndElement(User user, Element element);
}

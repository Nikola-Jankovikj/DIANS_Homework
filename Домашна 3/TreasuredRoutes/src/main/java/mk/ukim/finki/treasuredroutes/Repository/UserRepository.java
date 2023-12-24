package mk.ukim.finki.treasuredroutes.Repository;

import mk.ukim.finki.treasuredroutes.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
<<<<<<< HEAD

=======
    Optional<User> findByEmail(String email);
    User findByEmailAndPassword(String email, String password);
>>>>>>> 8a4b81cfd6c55d6bd43e2331018480097793dae0
}

package mk.ukim.finki.authuserservice.repository;

import mk.ukim.finki.authuserservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User getUserById(Long id);
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);

}

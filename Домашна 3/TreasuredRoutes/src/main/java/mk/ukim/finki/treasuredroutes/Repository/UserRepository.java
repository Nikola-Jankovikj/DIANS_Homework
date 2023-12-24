package mk.ukim.finki.treasuredroutes.Repository;

import mk.ukim.finki.treasuredroutes.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}

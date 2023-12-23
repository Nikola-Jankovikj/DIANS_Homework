package mk.ukim.finki.treasuredroutes.Repository;

import mk.ukim.finki.treasuredroutes.Model.Element;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ElementRepository extends JpaRepository<Element, Long> {
    Element getElementById(String id);
}

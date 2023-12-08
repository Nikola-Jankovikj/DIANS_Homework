package mk.ukim.finki.treasuredroutes.Repository;

import mk.ukim.finki.treasuredroutes.Model.Element;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ElementRepository extends JpaRepository<Element, Long> {
}

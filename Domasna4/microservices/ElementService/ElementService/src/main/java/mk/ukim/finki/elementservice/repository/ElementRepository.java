package mk.ukim.finki.elementservice.repository;

import mk.ukim.finki.elementservice.model.Element;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElementRepository extends JpaRepository<Element, Long> {
    Element getElementById(String id);
}

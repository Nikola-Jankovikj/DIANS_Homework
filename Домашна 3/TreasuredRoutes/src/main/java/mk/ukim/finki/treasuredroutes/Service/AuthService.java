package mk.ukim.finki.treasuredroutes.Service;

import mk.ukim.finki.treasuredroutes.Model.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface AuthService {
    User login(String username, String password);

    List<User> findAll();

}

package mk.ukim.finki.treasuredroutes.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "MAP_USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String profilePicture;

    public User(String email, String password, String profilePicture) {
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}

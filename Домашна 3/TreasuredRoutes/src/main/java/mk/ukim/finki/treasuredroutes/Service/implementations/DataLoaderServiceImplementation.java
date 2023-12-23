package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Repository.ElementRepository;
import mk.ukim.finki.treasuredroutes.Repository.UserRepository;
import mk.ukim.finki.treasuredroutes.Service.DataLoaderService;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Service
public class DataLoaderServiceImplementation implements DataLoaderService{

    private final ElementRepository elementRepository;
    private final UserRepository userRepository;

    public DataLoaderServiceImplementation(ElementRepository elementRepository, UserRepository userRepository) {
        this.elementRepository = elementRepository;
        this.userRepository = userRepository;
    }

    public void loadDataFromCSV(String csvFilePath) {
        User user = new User(1L, "email1", "password", "images/My Snapshot.jpg");
        userRepository.save(user);
        user = new User(2L, "email2", "password2", "C:\\Users\\Laptop\\Desktop\\DIANS_Homework\\Domasna 3\\TreasuredRoutes\\src\\main\\resources\\Images\\User\\My Snapshot.jpg");
        userRepository.save(user);
        try (BufferedReader br = new BufferedReader(new FileReader(csvFilePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(";");
                Element element = new Element(data[0], data[1], data[2], data[3], data[4]);
                elementRepository.save(element);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

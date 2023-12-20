package mk.ukim.finki.treasuredroutes.Service.implementations;

import mk.ukim.finki.treasuredroutes.Model.Element;
import mk.ukim.finki.treasuredroutes.Repository.ElementRepository;
import mk.ukim.finki.treasuredroutes.Service.DataLoaderService;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Service
public class DataLoaderServiceImplementation implements DataLoaderService{

    private final ElementRepository elementRepository;

    public DataLoaderServiceImplementation(ElementRepository elementRepository) {
        this.elementRepository = elementRepository;
    }

    public void loadDataFromCSV(String csvFilePath) {
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

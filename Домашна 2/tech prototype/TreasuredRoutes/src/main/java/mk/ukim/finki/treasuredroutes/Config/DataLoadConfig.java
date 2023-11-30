package mk.ukim.finki.treasuredroutes.Config;

import mk.ukim.finki.treasuredroutes.Service.DataLoaderService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoadConfig implements CommandLineRunner {

    private final DataLoaderService dataLoaderService;

    public DataLoadConfig(DataLoaderService dataLoaderService) {
        this.dataLoaderService = dataLoaderService;
    }

    @Override
    public void run(String... args) throws Exception {
        dataLoaderService.loadDataFromCSV("src/main/resources/data.csv");
    }
}

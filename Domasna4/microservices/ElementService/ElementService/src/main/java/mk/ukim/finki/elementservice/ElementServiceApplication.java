package mk.ukim.finki.elementservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient

public class ElementServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElementServiceApplication.class, args);
    }

}

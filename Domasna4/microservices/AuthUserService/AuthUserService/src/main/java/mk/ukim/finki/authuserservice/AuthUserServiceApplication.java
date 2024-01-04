package mk.ukim.finki.authuserservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class AuthUserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthUserServiceApplication.class, args);
    }

}

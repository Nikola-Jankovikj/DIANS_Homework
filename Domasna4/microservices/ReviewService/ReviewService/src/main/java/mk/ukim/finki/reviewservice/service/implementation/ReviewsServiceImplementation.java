package mk.ukim.finki.reviewservice.service.implementation;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.reviewservice.model.Review;
import mk.ukim.finki.reviewservice.model.exceptions.ReviewNotFoundException;
import mk.ukim.finki.reviewservice.repository.ReviewsRepository;
import mk.ukim.finki.reviewservice.service.ReviewsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewsServiceImplementation implements ReviewsService {

    private final ReviewsRepository reviewsRepository;
    private final RestTemplate restTemplate;
    private String authUser = "graceful-yoke-api.up.railway.app";
    @Override
    public void addReview(Long userId, Long elementId, int rating) {
        Review review = new Review(userId, elementId, rating);
        Review existing = reviewsRepository.findByUserIdAndElementId(userId, elementId).orElse(null);
        if (existing != null) {
            review = existing;
            review.setRating(rating);
        }
        reviewsRepository.save(review);
    }

    @Override
    public void removeReview(Long userId, Long elementId) {
        Review review = reviewsRepository.findByUserIdAndElementId(userId, elementId).orElse(null);
        reviewsRepository.delete(review);
    }

    @Override
    public List<Review> getUserReviews(Long userId) {
        return reviewsRepository.findByUserId(userId);
    }

    @Override
    public double getElementRating(Long elementId) {
        return reviewsRepository.findByElementId(elementId)
                .stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0);
    }

    @Override
    public int getRatingByUserAndElement(Long userId, Long elementId) throws ReviewNotFoundException {
        Review review = reviewsRepository.findByUserIdAndElementId(userId, elementId)
                .orElseThrow(ReviewNotFoundException::new);
        return review.getRating();
    }

    @Override
    public Long authUserId(String authServiceName, String jwt) {
        String authUserEndpoint = "https://" + "foolish-development-users.up.railway.app" + "/auth/authUser";
        System.out.println("ENDPOINT: " + authUserEndpoint);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", jwt);
        headers.set("Content-Type", "application/json");

        RequestCallback requestCallback = request -> request.getHeaders().addAll(headers);

        ResponseExtractor<ResponseEntity<Long>> responseExtractor = restTemplate.responseEntityExtractor(Long.class);

        ResponseEntity<Long> responseEntity = restTemplate.execute(authUserEndpoint, HttpMethod.GET, requestCallback, responseExtractor);

        //ResponseEntity<Long> responseEntity = restTemplate.getForEntity(authUserEndpoint, Long.class);
        System.out.println("RESPONSE: " + responseEntity);
        return responseEntity.getBody();
    }
}

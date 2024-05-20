package com.nationalParkApp.demo.service;

import com.nationalParkApp.demo.Model.Review;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReviewService {
    ResponseEntity createReview(Review review);

    ResponseEntity<String> getAllReviews();

    ResponseEntity<String> getAllReviewsByParkCode(String parkCode);

    ResponseEntity<String> getAllReviewsByUserId(Long id);

    boolean deleteReview(Long id);

    Review getReviewById();

    Review getReviewById(Long id);

    Review updateReview(Long id, Review review);
}

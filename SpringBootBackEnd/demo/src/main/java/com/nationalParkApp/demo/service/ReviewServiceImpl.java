package com.nationalParkApp.demo.service;

import com.nationalParkApp.demo.entity.ReviewEntity;
import com.nationalParkApp.demo.Model.Review;
import com.nationalParkApp.demo.Repository.ReviewRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService{

    private ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public ResponseEntity createReview(Review review) {
        ResponseEntity response = null;
        try {
        ReviewEntity reviewEntity = new ReviewEntity();

        BeanUtils.copyProperties(review, reviewEntity);
        reviewRepository.save(reviewEntity);
        if (reviewEntity.getId()>0) {
            response = ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(reviewEntity);
        }}
    catch (Exception ex) {
        response = ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("AN exception occurred due to " + ex.getMessage());
    }
        return response;
        }

    @Override
    public ResponseEntity<String> getAllReviews() {
        ResponseEntity response = null;
        try {
            List<ReviewEntity> reviewEntities = reviewRepository.findAll();
            if (reviewEntities.size()>0){
                List<Review> reviews = reviewEntities.stream().map(rev -> new Review(
                            rev.getId(),
                            rev.getContent(),
                            rev.getParkCode(),
                            rev.getUser()))
                    .collect(Collectors.toList());
                response = ResponseEntity
                        .status(HttpStatus.ACCEPTED)
                        .body(reviews);
            }   else {
                response = ResponseEntity
                        .status(HttpStatus.OK)
                        .body("No reviews found");
        }}
        catch (Exception ex) {
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("AN exception occurred due to " + ex.getMessage());
        }

        return response;
    }

    @Override
    public ResponseEntity<String> getAllReviewsByParkCode(String parkCode) {

        ResponseEntity response = null;
        try {
            List<ReviewEntity> reviewEntities = reviewRepository.findByParkCode(parkCode);
            if (reviewEntities.size()>0){
                List<Review> reviews = reviewEntities.stream().map(rev -> new Review(
                                rev.getId(),
                                rev.getContent(),
                                rev.getParkCode(),
                                rev.getUser()))
                        .collect(Collectors.toList());
                response = ResponseEntity
                        .status(HttpStatus.ACCEPTED)
                        .body(reviews);
            }   else {
                response = ResponseEntity
                        .status(HttpStatus.OK)
                        .body("No reviews found");
            }}
        catch (Exception ex) {
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("AN exception occurred due to " + ex.getMessage());
        }

        return response;
    }

    @Override
    public ResponseEntity<String> getAllReviewsByUserId(Long userId) {

        ResponseEntity response = null;
        try {
            List<ReviewEntity> reviewEntities = reviewRepository.findByUserId(userId);
            if (reviewEntities.size() > 0) {
                List<Review> reviews = reviewEntities.stream().map(rev -> new Review(
                                rev.getId(),
                                rev.getContent(),
                                rev.getParkCode(),
                                rev.getUser()))
                        .collect(Collectors.toList());
                response = ResponseEntity
                        .status(HttpStatus.ACCEPTED)
                        .body(reviews);
            } else {
                response = ResponseEntity
                        .status(HttpStatus.OK)
                        .body("No reviews found");
            }
        } catch (Exception ex) {
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("AN exception occurred due to " + ex.getMessage());
        }

        return response;
    }

    @Override
    public boolean deleteReview(Long id) {
        ReviewEntity review = reviewRepository.findById(id).get();
        reviewRepository.delete(review);
        return true;
    }

    @Override
    public Review getReviewById() {
        return null;
    }

    @Override
    public Review getReviewById(Long id) {
        ReviewEntity reviewEntity = reviewRepository.findById(id).get();
        Review review = new Review();
        BeanUtils.copyProperties(reviewEntity, review);
        return review;
    }

    @Override
    public Review updateReview(Long id, Review review) {
        ReviewEntity reviewEntity = reviewRepository.findById(id).get();
        reviewEntity.setContent(review.getContent());

        reviewRepository.save(reviewEntity);
        return review;
    }
}

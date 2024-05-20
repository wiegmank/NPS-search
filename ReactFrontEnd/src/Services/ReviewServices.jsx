import React from 'react'
import axios from 'axios'
import { getItem } from 'localforage';
import { useNavigate } from "react-router";

class ReviewService {
  
  createReview(review, instance) {
    
    if (window.localStorage.getItem("Auth")) {
      instance.defaults.headers["Authorization"] = window.localStorage.getItem("Auth");
      instance.post('/review',review)
      .then((response) => {
      if(response.status == 201) {
        useNavigate("/home");
      }});
    }
    
  }

  getAllReviews(instance) {
    instance.get("/reviews").then((response) =>{
      console.log(response);
    })
  }

  getReviewsByUserId(id) {
    return axios.get(REVIEW_API_BASE_URL + "/" + "user", id);
  }

  getReviewsByParkcode(parkcode) {
    return axios.get(REVIEW_API_BASE_URL + "/" + "parkcode" + parkcode);
  }

  deleteReview(id) {
    return axios.delete(REVIEW_API_BASE_URL + "/" + id);
  }
}

export default new ReviewService();
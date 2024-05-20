import React from 'react'
import { Link } from 'react-router-dom'
import Slideshow from './Slideshow'
import Header from './Header'
import Footer from './Footer'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from 'axios'
import { states } from '../constants/Enum'
import LoginService from '../Services/LoginService'
import ReviewServices from '../Services/ReviewServices'


function Home() {
  const REVIEW_API_BASE_URL = "http://localhost:8080/api/v1";

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: REVIEW_API_BASE_URL,
    headers: {
      "Cache-Control": "no-cache",
      "Accept-Language": "en",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "POST , GET",
      "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
      "Authorization": null
    },
  });  
  const reset = (e) => {
    e.preventDefault();
    ReviewServices.getAllReviews(axiosInstance);
  }
  return (
    <>
      <div className="bg-nps-green-300 h-lvh">
        <Header />
        <Slideshow />
        <div className="flex flex-col border border-nps-green-999 rounded-xl my-10 mx-auto p-6 lg:w-1/2">
          <div className="text-center">"Welcome to Park Trippin'!</div>
          <div> Here, you'll effortlessly discover the natural wonders and serene beauty of our country's most cherished landscapes. Whether you seek rugged trails, tranquil lakes, or breathtaking vistas, embark on your next adventure with us. Start exploring, and let the journey to our nation's heart begin!</div>
        </div>
      
      <button
          className="bg-red-700 hover:bg-red-900 font-semibold text-amber-950"
          onClick={reset}
        >
          Clear
        </button>
        </div>
    </>
  )
}

export default Home
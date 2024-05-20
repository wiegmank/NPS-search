import Header from './Header'
import { queryClient } from '../main'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import ItineraryServices from '../Services/ItineraryServices'
import axios from "axios";

function Itinerary() {

//used for react query testing
// const data = queryClient.getQueryData(["someparks"])
const singlePark = queryClient.getQueryData(["singlePark"])

const parkDetails = singlePark.data[0]
// // const parksFound = queryClient.getQueryData(['parksFound'])
// console.log("HERE IS THE REACT QUERY CACHED DATA FROM HOME")
// console.log(data)
// console.log("HERE IS THE REACT QUERY CACHED DATA FROM PARK DETAILS")
// console.log(data)

const [startDate, setStartDate] = useState(new Date());

const [endDate, setEndDate] = useState(new Date());

const user = JSON.parse(window.localStorage.getItem("User"));
const ITINERARY_API_BASE_URL = "http://localhost:8080/api/v1";
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: ITINERARY_API_BASE_URL,
    headers: {
      "Cache-Control": "no-cache",
      "Accept-Language": "en",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
      "Authorization": null
    },
  });

const [itinerary, setItinerary] = useState({
  id: "",
  startDate: new Date(),
  endDate: new Date(),
  parkCode: parkDetails.parkCode,
  user: user,
});

const navigate = useNavigate();

const handleChange = (name, date) => {
  setItinerary({ ...itinerary, [name]: date });
};

const saveItinerary = (e) => {
  e.preventDefault();
  setItinerary({ ...itinerary, user: user });
  
  ItineraryServices.CreateItinerary(itinerary, axiosInstance)
      //navigate("/home")
    }
    


const reset = (e) => {
  e.preventDefault();
  setItinerary({
    id: "",
    startDate: new Date(),
    endDate: new Date(),
    parkCode: parkDetails.parkCode,
    user: user,
  });
};

return (
  <>
    <Header />

    <div className="bg-gray-400 pt-10 pb-4 mt-10 mx-10 mb-20">
      <div>
        <h1 className="underline underline-offset-4 px-5 py-4 text-amber-950">
          Create Itinerary for {parkDetails.name}
        </h1>
      </div>
      <div>
        <p className="font-semibold">Trip Start date:</p>
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          selected={itinerary.startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={(date) => handleChange("startDate", date)}
          name="startDate"
        />
      </div>
      <div>
        <p className="font-semibold">Trip End date:</p>
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          selected={itinerary.endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={(date) => handleChange("endDate", date)}
          name="endDate"
        />
      </div>
      <div className="flex justify-center space-x-10 pt-6">
        <button
          className=" bg-green-700 hover:bg-green-900 font-semibold text-amber-950"
          onClick={saveItinerary}
        >
          Submit
        </button>

        <button
          className="bg-red-700 hover:bg-red-900 font-semibold text-amber-950"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  </>
);
}

export default Itinerary

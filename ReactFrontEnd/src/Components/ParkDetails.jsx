import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { useGlobalContext } from '../context';
import { Carousel } from 'flowbite-react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FavoritesServices from '../Services/FavoritesServices';

const getParkInfoURL="https://developer.nps.gov/api/v1/parks?parkCode="
const api_key=import.meta.env.VITE_REACT_APP_NPS_API_KEY;

function ParkDetails() {
  const [singlePark, setPark] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { parkCode } = useParams();
  // const { searches } = useGlobalContext();
  const mapRef = useRef();

  //this sets parkId equal to the parkcode at then end of the current url
  const parkId = useParams().parkcode;

  //const [parkCodes, setParkCodes] = useState();
  //sets current user by pulling from local storage
  const currentUser = JSON.parse(window.localStorage.getItem("User"));
  const [favorites, setFavorites] = useState({
    id: "",
    parkCode: parkId,
    user: currentUser
  });
  const parkIdChecker = (parkId, currentUser) => {
    const favoritesList = currentUser.favorites;
    return favoritesList.includes(parkId);
  }
  
  const Favorite_API_BASE_URL = "http://localhost:8080/api/v1";
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: Favorite_API_BASE_URL,
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
  //This useEffect gets user favorited park codes and checks if searched for park is already favorited//

  /*useEffect(() => {
     function getFaveParkCodes() {
      const favoritesList = currentUser.favorites;
      
      if (favoritesList.includes(parkId)) {
        setToggle(true);
      }
    }
    getFaveParkCodes();
  });*/

  const saveToFavorites = () => {
    setFavorites({ ...favorites, parkCode: parkId, user: currentUser });
    setToggle(true);
    FavoritesServices.createFavorite(favorites,axiosInstance);
    console.log(parkIdChecker(parkId,currentUser));
      
  };

  // //below uses react query to make an API call, which is then accessible to review & itinerary pages via (['singlePark'])
  const { data, error, isLoading, status } = useQuery({
    queryKey: ["singlePark"],
    queryFn: () =>
      fetch(
        "https://developer.nps.gov/api/v1/parks?parkCode=" +
          parkId + "&api_key=" + api_key ).then((res) => res.json()),
  });

  if (error) return <div>There was an error</div>;
  if (isLoading) return <div>DATA IS LOADING...</div>;

  //#############################
  //WORKING WITH FRESH API CALLS

  // useEffect(() => {
  //     getSinglePark();
  // }, [])

  // const getSinglePark = async () => {
  //     try {
  //         const response = await axios.get("https://developer.nps.gov/api/v1/parks?parkCode="+parkId+"&api_key=Wrk46hd2qqrRis6VpJA8CT12EeDczzGa9dYRBjYk")
  // .then(response => {
  // axios.get(getParkInfoURL+parkCode+"&api_key="+api_key).then((response) => {
  // setPark(response.data.data[0])
  // setPark(response.data.data)
  // console.log(singlePark)
  // setPark(response.data.data[0])
  // console.log("singlePark is: " + singlePark)
  // });
  //     } catch (error) {
  //         console.log("Error: ", error)
  //     }
  // }
  //###############################

  //###############################
  //Working, turned off for testing
  // const singlePark = searches.find(park => park.parkCode === useParams().parkCode)
  // console.log(parkCode)
  // async function getPark() {
  //     try{
  //         const response = axios.get(getParkInfoURL+parkCode+"&api_key="+api_key);
  //         console.log(response)
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }
  // .then(response=>setPark(response.data.data))
  //########################

  //initialize single park object
  const parkInfo = data.data[0];

  //intialize lat/long from Park (not "addresses")
  const latlong = [Number(parkInfo.latitude), Number(parkInfo.longitude)];

  // console.log("CONTACTS")
  const phone = parkInfo.contacts.phoneNumbers[0].phoneNumber;

  //template for phone number formatting
  let newPhone = "(xxx) xxx-xxxx";

  for (let i = 0; i < phone.length; i++) {
    newPhone = newPhone.replace("x", phone[i]);
  }

  //initializes collection of addresses
  const addresses = [parkInfo.addresses];

  //separates physical addresses into new array
  const physicalAddresses = [];

  for (let i = 0; i < addresses.length; i++) {
    for (let j = 0; j < addresses[i].length; j++) {
      if (addresses[i][j].type == "Physical") {
        physicalAddresses.push(addresses[i][j]);
      }
    }
  }

  const markerAddress = {
    name: parkInfo.fullName,
    street: physicalAddresses[0].line1,
    city: physicalAddresses[0].city,
    state: physicalAddresses[0].stateCode,
    zip: physicalAddresses[0].postalCode,
  };

  //creates map marker on map
  function POI({ coords }) {
    return (
      <Marker position={coords}>
        <Popup className="font-bold text-lg">
          <div className="flex flex-col items-center">
            <div>{markerAddress.name}</div>
            <div>{markerAddress.street}</div>
            <div>
              {markerAddress.city}, {markerAddress.state} {markerAddress.zip}
            </div>
          </div>
        </Popup>
      </Marker>
    );
  }

  //creates map
  function MapMaker({ coords }) {
    return (
      <div className="flex justify-center h-1/2 m-5">
        <MapContainer
          center={coords}
          zoom={11}
          ref={mapRef}
          scrollWheelZoom={false}
          className="w-3/4 h-screen rounded-xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <POI coords={latlong} />
        </MapContainer>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="h-full bg-nps-green-300 pt-20 pb-20 px-10 rounded-md">
        <div name="title" className="flex flex-col items-center">
          <div>
            <h1 className="underline underline-offset-4 px-5 py-4">
              {parkInfo.fullName}
            </h1>
          </div>
          <div name="designation" className="flex px-2">
            <div className="underline underline-offset-2 px-3">
              Designation:{" "}
            </div>
            <div>{parkInfo.designation}</div>
          </div>
          <div name="states" className="flex px-2">
            <div className="underline underline-offset-2 px-3">States:</div>
            <div>{parkInfo.states}</div>
          </div>
        </div>

        <div name="images" className="py-10 h-svh">
          <Carousel slide={false} className=" shadow-2xl">
            {parkInfo.images.map((image, idx) => (
              <img key={idx} src={image.url} className="" />
            ))}
          </Carousel>
        </div>

        <div name="description" className="px-40 py-10">
          {parkInfo.description}
        </div>
        <div name="weather" className="px-40 py-10">
          <p className="underline underline-offset-2">Weather: </p>
          {parkInfo.weatherInfo}
        </div>

        <div name="activities" className="px-40 py-10">
          <p className="underline underline-offset-2">Activities:</p>
          {parkInfo.activities.map((activity) => {
            return activity.name + ", ";
          })}
        </div>

        <div
          name="contact-info"
          className="bg-nps-green-600 drop-shadow-2xl  my-20 py-5 w-1/2 flex flex-col items-center text-center mx-auto rounded-2xl"
        >
          <div>
            <p className="underline underline-offset-4 font-semibold">
              Park Contact Info
            </p>
          </div>
          <div>
            <p>{parkInfo.contacts.emailAddresses[0].emailAddress}</p>
            <p>{newPhone}</p>
            <p className="">place holder text</p>
          </div>
        </div>

        <div name="button group" className="flex justify-evenly">
          {toggle ? (
            <button className="bg-yellow-500 rounded-3xl">Favorited</button>
          ) : (
            <button
              className="bg-yellow-300 rounded-3xl"
              onClick={saveToFavorites}
            >
              Add to favorites
            </button>
          )}
          <Link to="/createreview">
            <button className="bg-yellow-300 rounded-3xl">Review</button>
          </Link>
          <Link to="/itinerary">
            <button className=" bg-yellow-300 rounded-3xl">
              Create Itinereary
            </button>
          </Link>
        </div>
        <div name="map" className="pt-10 drop-shadow-2xl">
          <MapMaker coords={latlong} />
        </div>
      </div>
    </>
  );
}

export default ParkDetails
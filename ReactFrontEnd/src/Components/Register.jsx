import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Slideshow from './Slideshow'
import Header from './Header'
import axios from 'axios';
import Itinerary from './Itinerary';
import LoginService from '../Services/LoginService';

  const SERVER_API_BASE_URL = "http://localhost:8080";
  const axiosInstance = axios.create({
        //withCredentials: true,
        baseURL: SERVER_API_BASE_URL,
        headers: {
        "Cache-Control": "no-cache",
        "Accept-Language": "en",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Authorization": null,
        }});

function Register() {
  const [user, setUser] = useState({username: "", password: ""});
  //const navigate = useNavigate();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance.post("/register", user).then((response) => {
        if(response.status == 201){
          LoginService.login(user,axiosInstance);
        const loggedInUser = JSON.parse(window.localStorage.getItem("User"));
        if (user.username == loggedInUser.username) {
          console.log("yes");
        
        
      }}})  
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  return (<>
    <Header />
    {/* <Slideshow /> */}

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter a Password"
      />
      <button type="submit">Submit</button>
    </form>
    </>
  );
}

export default Register

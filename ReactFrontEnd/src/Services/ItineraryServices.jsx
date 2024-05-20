import axios from "axios";

const ITINERARY_API_BASE_URL = "http://localhost:8080/api/v1/itinerary";

class ItineraryServie {
  CreateItinerary(itinerary,instance) {
    if (window.localStorage.getItem("Auth")) {
      instance.defaults.headers["Authorization"] = window.localStorage.getItem("Auth");
      instance.post('/itinerary',itinerary)
      .then((response) => {
      if(response.status == 201) {
      }});
    }
  }

  deleteItinerary(id) {
    return axios.delete(ITINERARY_API_BASE_URL + "/" + id);
  }

  getItinerariesByParkCode(parkCode) {
    return axios.get(ITINERARY_API_BASE_URL + "/" + "parkcode" + parkCode);
  }

  getItinerariesByUserId(id) {
    return axios.get(ITINERARY_API_BASE_URL + "/" + "user" + id);
  }
}

export default new ItineraryServie();
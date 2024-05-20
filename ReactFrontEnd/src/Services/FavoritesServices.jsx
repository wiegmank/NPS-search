import React from "react";
import axios from "axios";

const FAVORITES_API_BASE_URL = "http://localhost:8080/api/v1/favorites";

//const FAVORITES_API_LIST_URL = "http://localhost:8080/api/v1/addFavorites";






class FavoritesServices {
  createFavorite(favorite,instance) {
    if (window.localStorage.getItem("Auth")) {
      instance.defaults.headers["Authorization"] = window.localStorage.getItem("Auth");
      instance.post('/addFavorites',favorite)
      .then((response) => {
      if(response.status === 201) {
        const user = JSON.parse(window.localStorage.getItem("User"));
        user.favorites.push(response.data);
        const stringedUser = JSON.stringify(user);
        window.localStorage.setItem("User", stringedUser);

      }})
    }
  }

  
  getFavorites(instance) {
    return axios.get(FAVORITES_BASE_API_URL);
  }

  getFavoritesByUserId(id, instance) {
    return axios.get(FAVORITES_BASE_API_URL + "/" + "user" + "/" + id);
  }

  deleteFavorites(id) {
    return axios.delete(FAVORITES_BASE_API_URL + "/" + id);
  }
}

export default new FavoritesServices();

package com.nationalParkApp.demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private long id;
    private String username;
    private String password;
    private List<com.nationalParkApp.demo.Model.Itinerary> itineraries;
    private List<com.nationalParkApp.demo.Model.Review> reviews;
    private List<com.nationalParkApp.demo.Model.Favorites> favorites;
    private String role = "user";

}
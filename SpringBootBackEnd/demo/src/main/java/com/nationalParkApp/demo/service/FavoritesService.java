package com.nationalParkApp.demo.service;

import com.nationalParkApp.demo.Model.Favorites;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavoritesService {

    ResponseEntity addToFavorites(Favorites favorites);

    boolean deleteFromFavorites(Long id);

    List<Favorites> getAllByParkCode(String parkCode);

    List<Favorites> getAllByUserId(Long id);

    List<Favorites> getAllFavorites();

    Favorites getFavoritesById(Long id);
}
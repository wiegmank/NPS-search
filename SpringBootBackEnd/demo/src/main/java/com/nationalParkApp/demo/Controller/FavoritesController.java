package com.nationalParkApp.demo.Controller;

import com.nationalParkApp.demo.Model.Favorites;
import com.nationalParkApp.demo.Model.User;
import com.nationalParkApp.demo.service.FavoritesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/")
public class FavoritesController {

    private FavoritesService favoritesService;

    public FavoritesController(FavoritesService favoritesService) { this.favoritesService =favoritesService; }

    @GetMapping("/favorites/{id}")
    public ResponseEntity<Favorites> getFavoritesById(@PathVariable Long id) {
        Favorites favorites = null;
        favorites = favoritesService.getFavoritesById(id);
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/addFavorites")
    public ResponseEntity addToFavorites(@RequestBody Favorites favorites) {
        return favoritesService.addToFavorites(favorites);
    }

    @GetMapping("/favorites")
    public List<Favorites> getAllFavorites() {
        return favoritesService.getAllFavorites();
    }

    @GetMapping("/favorites/user/{id}")
    public List<Favorites> getAllFavoritesByUserId(@PathVariable Long id) {

        return favoritesService.getAllByUserId(id);
    }
    @DeleteMapping("/favorites{id}")
    public ResponseEntity<Object> deleteFavorite(@PathVariable Long id) {
        boolean deleted = false;
        deleted = favoritesService.deleteFromFavorites(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
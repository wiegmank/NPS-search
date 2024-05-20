package com.nationalParkApp.demo.service;

import com.nationalParkApp.demo.Model.Favorites;
import com.nationalParkApp.demo.Repository.FavoritesRepository;
import com.nationalParkApp.demo.entity.FavoritesEntity;
import com.nationalParkApp.demo.entity.ReviewEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FavoritesServiceImpl implements FavoritesService {

    private FavoritesRepository favoritesRepository;

    public FavoritesServiceImpl(FavoritesRepository favoritesRepository) { this.favoritesRepository = favoritesRepository; }

    @Override
    public ResponseEntity addToFavorites(@RequestBody Favorites favorites) {
        ResponseEntity response = null;
        try {
            FavoritesEntity favoritesEntity = new FavoritesEntity();

            BeanUtils.copyProperties(favorites, favoritesEntity);
            favoritesRepository.save(favoritesEntity);
            if (favoritesEntity.getId()>0) {
                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(favoritesEntity);
            }}
        catch (Exception ex) {
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("AN exception occurred due to " + ex.getMessage());
        }

        return response;
    }

    @Override
    public boolean deleteFromFavorites(Long id) {
        FavoritesEntity favorite = favoritesRepository.findById(id).get();
        favoritesRepository.delete(favorite);
        return false;
    }

    @Override
    public List<Favorites> getAllByParkCode(String parkCode) {
        List<FavoritesEntity> favoritesEntities = favoritesRepository.findByParkCode(parkCode);

        List<Favorites> favorites = favoritesEntities.stream().map(fav -> new Favorites(
                        fav.getId(),
                        fav.getParkCode(),
                        fav.getUser()))
                .collect(Collectors.toList());
        return favorites;
    }

    @Override
    public List<Favorites> getAllByUserId(Long id) {
        List<FavoritesEntity> favoritesEntities = favoritesRepository.findByUserId(id);

        List<Favorites> favorites = favoritesEntities.stream().map(fav -> new Favorites(
                        fav.getId(),
                        fav.getParkCode()))
                .collect(Collectors.toList());
        return favorites;
    }

    @Override
    public List<Favorites> getAllFavorites() {
        List<FavoritesEntity> favoritesEntities = favoritesRepository.findAll();

        List<Favorites> favorites = favoritesEntities.stream().map(fav -> new Favorites(
                        fav.getId(),
                        fav.getParkCode(),
                        fav.getUser()))
                .collect(Collectors.toList());
        return favorites;
    }

    @Override
    public Favorites getFavoritesById(Long id) {
        FavoritesEntity favoritesEntity = favoritesRepository.findById(id).get();
        Favorites favorites = new Favorites();
        BeanUtils.copyProperties(favoritesEntity, favorites);
        return favorites;
    }
}
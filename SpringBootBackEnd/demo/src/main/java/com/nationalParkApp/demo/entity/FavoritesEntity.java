package com.nationalParkApp.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.nationalParkApp.demo.Model.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "favorites")
public class FavoritesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String parkCode;

    @ManyToOne
    @JsonBackReference
    @JoinTable(name = "user_favorites",
            joinColumns = @JoinColumn(name = "favorites_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private UserEntity user;
}
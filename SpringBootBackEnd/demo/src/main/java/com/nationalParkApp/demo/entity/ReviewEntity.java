package com.nationalParkApp.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.nationalParkApp.demo.Model.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "review")
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String parkCode;

    private String content;

    @ManyToOne
    @JsonBackReference
    @JoinTable(name = "user_reviews",
            joinColumns = @JoinColumn(name = "review_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private UserEntity user;

}

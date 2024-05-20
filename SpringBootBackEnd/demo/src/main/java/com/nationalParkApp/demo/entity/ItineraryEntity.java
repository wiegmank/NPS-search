package com.nationalParkApp.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.nationalParkApp.demo.Model.User;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
@Table(name = "itinerary")
public class ItineraryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date startDate;

    private Date endDate;

    private String parkCode;

    @ManyToOne
    @JsonBackReference
    @JoinTable(name = "user_itineraries",
            joinColumns = @JoinColumn(name = "itinerary_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private UserEntity user;
}

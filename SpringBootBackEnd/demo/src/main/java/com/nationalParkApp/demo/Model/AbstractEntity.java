package com.nationalParkApp.demo.Model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode
@MappedSuperclass
public abstract class AbstractEntity {

    @Id
    @GeneratedValue
    @Getter
    private int id;

}
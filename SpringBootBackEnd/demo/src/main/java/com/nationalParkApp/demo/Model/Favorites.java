package com.nationalParkApp.demo.Model;

import com.nationalParkApp.demo.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Favorites {

    private long id;
    private String parkCode;
    private UserEntity user;

    public Favorites(long id, String parkCode) {
        this.id = id;
        this.parkCode = parkCode;
    }
}

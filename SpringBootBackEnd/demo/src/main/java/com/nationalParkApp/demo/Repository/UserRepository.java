package com.nationalParkApp.demo.Repository;

import com.nationalParkApp.demo.Model.User;
import com.nationalParkApp.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUsername(String username);

}

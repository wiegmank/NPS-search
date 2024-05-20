package com.nationalParkApp.demo.service;

import com.nationalParkApp.demo.Model.Favorites;
import com.nationalParkApp.demo.Model.User;
import com.nationalParkApp.demo.Repository.UserRepository;
import com.nationalParkApp.demo.entity.FavoritesEntity;
import com.nationalParkApp.demo.entity.UserEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) { this.userRepository = userRepository; }
    @Override
    public User createUser(User user) {
        UserEntity userEntity = new UserEntity();

        BeanUtils.copyProperties(user, userEntity);
        userRepository.save(userEntity);
        return user;
    }

    @Override
    public User getUserById(Long id) {
        UserEntity userEntity = userRepository.findById(id).get();
        User user = new User();
        BeanUtils.copyProperties(userEntity, user);
        return user;
    }

    @Override
    public User updateUser(Long id, User user) {
        UserEntity userEntity = userRepository.findById(id).get();
        userEntity.setUsername(user.getUsername());
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        return user;
    }

}

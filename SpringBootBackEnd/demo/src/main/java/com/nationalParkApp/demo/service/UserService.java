package com.nationalParkApp.demo.service;

import com.nationalParkApp.demo.Model.User;

public interface UserService {

    public User createUser(User user);

    public User getUserById(Long id);

    public User updateUser(Long id, User user);
}

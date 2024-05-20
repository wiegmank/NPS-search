package com.nationalParkApp.demo.Controller;

import com.nationalParkApp.demo.Model.User;
import com.nationalParkApp.demo.Repository.UserRepository;
import com.nationalParkApp.demo.entity.UserEntity;
import com.nationalParkApp.demo.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserEntity user) {

        ResponseEntity response = null;
        try {
            String hashward = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashward);

            userRepository.save(user);
            if (user.getId()>0) {
                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body("Given user details are successfully registered");
            }
        } catch (Exception ex) {
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("AN exception occurred due to " + ex.getMessage());
        }
        return response;
    }

    @RequestMapping("/user")
    public ResponseEntity loginUser (@RequestBody User user) {
        ResponseEntity response = null;
        try {
            String testUsername = user.getUsername();
            String testPassword = user.getPassword();
            String testHashword = passwordEncoder.encode(testPassword);
            UserEntity savedUser = userRepository.findByUsername(testUsername);
            if ( savedUser != null) {
                if(passwordEncoder.matches(testPassword, savedUser.getPassword())) {
                    response = ResponseEntity
                            .status(HttpStatus.OK)
                            .body(savedUser);
                } else {
                    response = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect credentials");
                }
            }
        } catch( Exception ex) {
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("AN exception occurred due to " + ex.getMessage())
                    ;
        }
        return response;
        }

}
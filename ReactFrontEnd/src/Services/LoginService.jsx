import React from "react";
import axios from "axios";





    

class LoginService {

    
    login(user, instance) { 
        
        if (user.username && user.password) {
        let reply;
        instance.post("/user",user)
            .then((response) => {
                
                window.localStorage.setItem("User", JSON.stringify(response.data));
                const hash = window.btoa(user.username+":"+user.password);
                const authHeader = "Basic "+ hash;
                window.localStorage.setItem("Auth", authHeader);
                
            });
            
        };
           
    }
};
export default new LoginService();
 
package com.nationalParkApp.demo.Config;

import com.nationalParkApp.demo.Filter.CsrfCookieFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
public class ProjectSecurityConfig {

    //sets security chain
    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName("_csrf");

        http.securityContext((context) -> context.requireExplicitSave(false))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
                config.setAllowedMethods(Collections.singletonList("*"));
                config.setAllowCredentials(true);
                config.setAllowedHeaders(Collections.singletonList("*"));
                config.setMaxAge(3600L);
                return config;
            }

        })).csrf((csrf) -> csrf.csrfTokenRequestHandler(requestHandler).ignoringRequestMatchers( "/api/v1/**","/register","/user")
                                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                        .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
                        .authorizeHttpRequests((requests)->requests

                                //.requestMatchers("/createreview","/itinerary", "/addFavorites", "/favorites", "/favorites/*", "/editreview/*").authenticated()
                                .requestMatchers("/register","/user", "/api/v1/**").permitAll())
                //.requestMatchers("/api/v1/**").authenticated()
                //.requestMatchers("/register","/user", "/reviews").permitAll())

                        .formLogin(Customizer.withDefaults())
                        .httpBasic(Customizer.withDefaults());
// =======
//         http.csrf((csrf) -> csrf.disable())
//                 .authorizeHttpRequests((requests) -> requests
//                         //.requestMatchers("/itinerary", "/createReview").authenticated()
//                         .requestMatchers( "/register", "/createReview").permitAll())
//                 .formLogin(Customizer.withDefaults())
//                 .httpBasic(Customizer.withDefaults());
// >>>>>>> main
        return http.build();
    }

    //sets password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
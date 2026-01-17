package com.eventapp.controller;

import com.eventapp.domain.Role;
import com.eventapp.domain.User;
import com.eventapp.repository.UserRepository;
import com.eventapp.service.GoogleTokenVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final GoogleTokenVerifier googleTokenVerifier;
    private final UserRepository userRepository;

    @PostMapping("/google")
    public User loginWithGoogle(@RequestBody Map<String, String> body) {

        System.out.println("AUTH BODY = " + body);
        String idToken = body.get("idToken");
        Role role = Role.valueOf(body.get("role"));

        var googleUser = googleTokenVerifier.verify(idToken);

        return userRepository.findByEmail(googleUser.email())
                .orElseGet(() -> {
                    User user = new User();
                    user.setName(googleUser.name());
                    user.setEmail(googleUser.email());
                    user.setRole(role);
                    return userRepository.save(user);
                });
    }
}
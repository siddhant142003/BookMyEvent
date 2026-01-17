package com.eventapp.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GoogleTokenVerifier {

    private static final String GOOGLE_TOKEN_INFO =
            "https://oauth2.googleapis.com/tokeninfo?id_token=";

    public GoogleUser verify(String idToken) {

        // 🔹 DEV MODE (for testing)
        if ("TEST".equals(idToken)) {
            return new GoogleUser("Test Organizer", "test@google.com");
        }

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response =
                restTemplate.getForObject(GOOGLE_TOKEN_INFO + idToken, Map.class);

        if (response == null || response.get("email") == null) {
            throw new RuntimeException("Invalid Google token");
        }

        return new GoogleUser(
                (String) response.get("name"),
                (String) response.get("email")
        );
    }

    public record GoogleUser(String name, String email) {}
}
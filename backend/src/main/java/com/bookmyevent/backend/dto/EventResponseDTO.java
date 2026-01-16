package com.bookmyevent.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventResponseDTO {

    private UUID id;
    private String name;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String venue;
    private String imageUrl;
    private String status;

    // organizer (flattened)
    private UUID organizerId;
    private String organizerName;
}

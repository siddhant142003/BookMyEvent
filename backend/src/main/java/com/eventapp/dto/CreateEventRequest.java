package com.eventapp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateEventRequest {
    private String title;
    private String description;
    private String location;

    private LocalDateTime eventDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private int totalTickets;
    private int availableTickets;

    private Long organizerId;
}
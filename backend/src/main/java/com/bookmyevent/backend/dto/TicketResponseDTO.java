package com.bookmyevent.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketResponseDTO {

    private UUID id;

    private UUID eventId;
    private String eventName;

    private UUID userId;
    private String userName;

    private UUID ticketTypeId;

    private String status;
    private LocalDateTime createdAt;
}

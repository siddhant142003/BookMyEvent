package com.eventapp.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketResponse {

    private Long ticketId;
    private String qrCode;
    private boolean checkedIn;
    private String message;
}
package com.bookmyevent.backend.ticket;

import java.time.LocalDateTime;
import java.util.UUID;

import com.bookmyevent.backend.event.Event;
import com.bookmyevent.backend.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "ticket_type_id")
    private UUID ticketTypeId;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}

package com.bookmyevent.backend.tickettype;


import java.math.BigDecimal;
import java.util.UUID;

import com.bookmyevent.backend.event.Event;

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
@Table(name = "ticket_types")
public class TicketType {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private String name;

    private BigDecimal price;

    @Column(name = "total_available")
    private int totalAvailable;

    private int sold;

    private String description;
}

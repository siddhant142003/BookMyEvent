package com.eventapp.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String location;

    private LocalDateTime eventDate;

    private int totalTickets;

    private int availableTickets;

    @ManyToOne
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;
}

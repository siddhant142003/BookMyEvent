package com.bookmyevent.backend.event;

import java.time.LocalDateTime;
import java.util.UUID;

import com.bookmyevent.backend.user.User;

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
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String description;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String venue;
    private String imageUrl;
    private String status;

    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private User organizer;
}


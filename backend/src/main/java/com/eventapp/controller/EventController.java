package com.eventapp.controller;

import com.eventapp.domain.Event;
import com.eventapp.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventRepository eventRepository;

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        event.setAvailableTickets(event.getTotalTickets());
        return eventRepository.save(event);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/organizer/{organizerId}")
    public ResponseEntity<List<Event>> getEventsByOrganizer(
            @PathVariable Long organizerId
    ) {
        List<Event> events = eventRepository.findByOrganizerId(organizerId);
        return ResponseEntity.ok(events);
    }
}
package com.eventapp.service;

import com.eventapp.domain.Event;
import com.eventapp.domain.User;
import com.eventapp.dto.CreateEventRequest;
import com.eventapp.repository.EventRepository;
import com.eventapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public Event createEvent(CreateEventRequest request) {

        User organizer = userRepository.findById(request.getOrganizerId())
                .orElseThrow(() -> new RuntimeException("Organizer not found"));

        Event event = new Event();
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setLocation(request.getLocation());
        event.setEventDate(request.getEventDate());
        event.setStartDate(request.getStartDate());
        event.setEndDate(request.getEndDate());

        event.setTotalTickets(request.getTotalTickets());
        event.setAvailableTickets(request.getTotalTickets()); // backend rule
        event.setOrganizer(organizer);
        event.setStatus("published");

        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByOrganizer(Long organizerId) {
        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() -> new RuntimeException("Organizer not found"));

        return eventRepository.findByOrganizer(organizer);
    }
}
package com.bookmyevent.backend.event;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmyevent.backend.dto.EventResponseDTO;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventResponseDTO> getAllEvents() {
        return service.getAllEvents().stream().map(event -> {
            EventResponseDTO dto = new EventResponseDTO();
            dto.setId(event.getId());
            dto.setName(event.getName());
            dto.setDescription(event.getDescription());
            dto.setStartTime(event.getStartTime());
            dto.setEndTime(event.getEndTime());
            dto.setVenue(event.getVenue());
            dto.setImageUrl(event.getImageUrl());
            dto.setStatus(event.getStatus());

            if (event.getOrganizer() != null) {
                dto.setOrganizerId(event.getOrganizer().getId());
                dto.setOrganizerName(event.getOrganizer().getName());
            }

            return dto;
        }).toList();
    }
}

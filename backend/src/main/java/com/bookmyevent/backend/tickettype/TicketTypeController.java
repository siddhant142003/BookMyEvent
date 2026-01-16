package com.bookmyevent.backend.tickettype;


import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ticket-types")
@CrossOrigin
public class TicketTypeController {

    private final TicketTypeRepository repository;

    public TicketTypeController(TicketTypeRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<TicketType> getAllTicketTypes() {
        return repository.findAll();
    }

    @GetMapping("/event/{eventId}")
    public List<TicketType> getTicketTypesByEvent(@PathVariable UUID eventId) {
        return repository.findByEventId(eventId);
    }
}

package com.bookmyevent.backend.event;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventService {

    private final EventRepository repo;

    public EventService(EventRepository repo) {
        this.repo = repo;
    }

    public List<Event> getAllEvents() {
        return repo.findAll();
    }
}

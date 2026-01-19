package com.eventapp.service;

import com.eventapp.domain.Event;
import com.eventapp.domain.Ticket;
import com.eventapp.domain.User;
import com.eventapp.repository.EventRepository;
import com.eventapp.repository.TicketRepository;
import com.eventapp.repository.UserRepository;
import com.eventapp.util.QrCodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.File;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public Ticket bookTicket(Long eventId, Long attendeeId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getAvailableTickets() <= 0) {
            throw new RuntimeException("Sold out");
        }

        User attendee = userRepository.findById(attendeeId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Ticket ticket = new Ticket();
        ticket.setEvent(event);
        ticket.setAttendee(attendee);

        event.setAvailableTickets(event.getAvailableTickets() - 1);
        eventRepository.save(event);

        return ticketRepository.save(ticket);
    }
}
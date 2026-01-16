package com.bookmyevent.backend.ticket;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmyevent.backend.dto.TicketResponseDTO;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin
public class TicketController {

    private final TicketRepository ticketRepository;

    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @GetMapping
    public List<TicketResponseDTO> getAllTickets() {
        return ticketRepository.findAll().stream().map(ticket -> {
            TicketResponseDTO dto = new TicketResponseDTO();

            dto.setId(ticket.getId());
            dto.setStatus(ticket.getStatus());
            dto.setCreatedAt(ticket.getCreatedAt());
            dto.setTicketTypeId(ticket.getTicketTypeId());

            if (ticket.getEvent() != null) {
                dto.setEventId(ticket.getEvent().getId());
                dto.setEventName(ticket.getEvent().getName());
            }

            if (ticket.getUser() != null) {
                dto.setUserId(ticket.getUser().getId());
                dto.setUserName(ticket.getUser().getName());
            }

            return dto;
        }).toList();
    }
}

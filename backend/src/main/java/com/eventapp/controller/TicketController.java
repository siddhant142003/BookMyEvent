package com.eventapp.controller;

import com.eventapp.domain.Ticket;
import com.eventapp.dto.TicketResponse;
import com.eventapp.repository.TicketRepository;
import com.eventapp.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class    TicketController {

    private final TicketService ticketService;
    private final TicketRepository ticketRepository;

    // ✅ BOOK TICKET
    @PostMapping("/book")
    public Ticket bookTicket(
            @RequestParam Long eventId,
            @RequestParam Long userId
    ) {
        return ticketService.bookTicket(eventId, userId);
    }

    // ✅ VALIDATE TICKET
    @GetMapping("/validate/{qrCode}")
    public TicketResponse validateTicket(@PathVariable String qrCode) {

        Ticket ticket = ticketRepository.findByQrCode(qrCode)
                .orElseThrow(() -> new RuntimeException("Invalid Ticket"));

        if (ticket.isCheckedIn()) {
            return new TicketResponse(
                    ticket.getId(),
                    ticket.getQrCode(),
                    true,
                    "Ticket already used"
            );
        }

        ticket.setCheckedIn(true);
        ticketRepository.save(ticket);

        return new TicketResponse(
                ticket.getId(),
                ticket.getQrCode(),
                true,
                "Ticket valid – entry allowed"
        );
    }

    @GetMapping("/qr/{ticketId}")
    public ResponseEntity<Resource> getQrCode(@PathVariable Long ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Ticket not found"));

        File file = new File("qr-codes/ticket-" + ticket.getId() + ".png");

        if (!file.exists()) {
            throw new ResponseStatusException(NOT_FOUND, "QR image not found");
        }

        Path path = Paths.get("qr-codes", "ticket-" + ticketId + ".png");
        Resource resource = new FileSystemResource(path);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + file.getName())
                .contentType(MediaType.IMAGE_PNG)
                .body(resource);
    }
}
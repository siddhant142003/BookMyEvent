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

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;

    @Transactional
    public Ticket bookTicket(Long eventId, Long userId) {

        Event event = eventRepository.findByIdForUpdate(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getAvailableTickets() <= 0) {
            throw new RuntimeException("Tickets sold out");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        event.setAvailableTickets(event.getAvailableTickets() - 1);

        Ticket ticket = new Ticket();
        ticket.setEvent(event);
        ticket.setAttendee(user);

        String qrCode = UUID.randomUUID().toString();
        ticket.setQrCode(qrCode);
        ticket.setCheckedIn(false);

        ticketRepository.save(ticket);
        eventRepository.save(event);

        // 🔹 Generate QR Image
        try {
            String dir = "qr-codes";
            new File(dir).mkdirs();

            String filePath = dir + "/ticket-" + ticket.getId() + ".png";
            QrCodeGenerator.generateQRCodeImage(qrCode, filePath);

        } catch (Exception e) {
            throw new RuntimeException("QR code generation failed");
        }

        return ticket;
    }
}
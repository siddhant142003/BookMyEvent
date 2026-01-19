package com.eventapp.repository;

import com.eventapp.domain.Ticket;
import com.eventapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByQrCode(String qrCode);
    List<Ticket> findByAttendee(User attendee);
    List<Ticket> findByAttendeeId(Long attendeeId);
}

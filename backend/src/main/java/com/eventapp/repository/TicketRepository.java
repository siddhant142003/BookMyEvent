package com.eventapp.repository;

import com.eventapp.domain.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByQrCode(String qrCode);
}
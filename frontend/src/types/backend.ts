// ===== USER =====
export type BackendUserRole = "ORGANIZER" | "ATTENDEE" | "STAFF";

export interface BackendUser {
    id: number;
    name: string;
    email: string;
    role: BackendUserRole;
}

// ===== EVENT =====
export interface BackendEvent {
    id: number;
    title: string;
    location: string;
    eventDate: string;
    totalTickets: number;
    availableTickets: number;
    organizer: BackendUser;
}

// ===== TICKET =====
export interface BackendTicket {
    id: number;
    qrCode: string;
    checkedIn: boolean;
    event: BackendEvent;
    attendee: BackendUser;
}

export interface Event {
    id: number;
    title: string;
    description?: string;
    location: string;
    eventDate: string;
    startDate: string;
    endDate: string;

    totalTickets: number;
    availableTickets: number;

    organizerId: number;
}

export class Event {
}

export class Ticket {
}

export class User {
    id: number;
    name: string;
}
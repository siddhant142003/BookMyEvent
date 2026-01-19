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
export interface Ticket {
    id: number;
    qrCode: string | null;
    checkedIn: boolean;

    event: {
        id: number;
        title: string;
        description: string;
        location: string;
        startDate: string;
        endDate: string;
        totalTickets: number;
        availableTickets: number;
    };

    attendee: {
        id: number;
        name: string;
        email: string;
    };
}

export interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    eventDate: string;
    startDate: string;
    endDate: string;
    status: string;
    totalTickets: number;
    availableTickets: number;
    organizer: {
        id: number;
        name: string;
        email: string;
    };
}

export class Event {
}

export class Ticket {
}

export class User {
    id: number;
    name: string;
}
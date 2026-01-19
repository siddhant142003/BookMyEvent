import { http } from '../http';
import type { Ticket } from '@/types/backend';

export const TicketAPI = {
    bookTicket: async (eventId: number, attendeeId: number): Promise<Ticket> => {
        const res = await http.post(
            `/api/tickets/book?eventId=${eventId}&attendeeId=${attendeeId}`
        );
        return res.data;
    },

    getMyTickets: async (attendeeId: number) => {
        const res = await http.get(`/api/tickets/attendee/${attendeeId}`);
        return res.data;
    },

    validateTicket: async (qrCode: string): Promise<string> => {
        const res = await http.get(`/api/tickets/validate/${qrCode}`);
        return res.data;
    },
};
import { http } from '../http';
import type { Ticket } from '@/types/backend';

export const TicketAPI = {
    bookTicket: async (eventId: number, userId: number): Promise<Ticket> => {
        const res = await http.post(
            `/tickets/book?eventId=${eventId}&userId=${userId}`
        );
        return res.data;
    },

    validateTicket: async (qrCode: string): Promise<string> => {
        const res = await http.get(`/tickets/validate/${qrCode}`);
        return res.data;
    },
};
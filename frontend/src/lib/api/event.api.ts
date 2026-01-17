import { http } from '../http';
import type { Event } from '@/types/backend';

export const EventAPI = {
    getAllEvents: async (): Promise<Event[]> => {
        const res = await http.get('/events');
        return res.data;
    },

    createEvent: async (event: Partial<Event>): Promise<Event> => {
        const res = await http.post('/events', event);
        return res.data;
    },
};
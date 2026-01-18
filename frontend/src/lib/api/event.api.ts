import { http } from "../http";
import type { Event } from "@/types/backend";

export const EventAPI = {
    getAllEvents: async (): Promise<Event[]> => {
        const res = await http.get("/api/events");
        return res.data;
    },

    createEvent: async (event: Partial<Event>): Promise<Event> => {
        const res = await http.post("/api/events", event);
        return res.data;
    },

    getEventsByOrganizer: async (organizerId: number) => {
        const res = await http.get(`/api/events/organizer/${organizerId}`);
        return res.data;
    }
};
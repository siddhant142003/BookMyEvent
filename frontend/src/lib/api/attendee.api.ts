import { http } from "../http";
import type { Event } from "@/types/backend";

export const AttendeeAPI = {
    getAllEvents: async (): Promise<Event[]> => {
        const res = await http.get<Event[]>("/api/events");
        return res.data;
    },
};
import { http } from "../http";

export const StaffAPI = {
    getActiveEvent: async () => {
        const res = await http.get("/api/events"); // reuse events API
        return res.data[0]; // pick first event for now
    },

    validateTicket: async (qrCode: string) => {
        const res = await http.get(`/api/tickets/validate/${qrCode}`);
        return res.data;
    }
};
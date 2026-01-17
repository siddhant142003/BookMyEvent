import { http } from "../http";

export interface AuthResponse {
    id: number;
    name: string;
    email: string;
    role: "ORGANIZER" | "ATTENDEE" | "STAFF";
}

export const AuthAPI = {
    loginWithGoogle: async (
        idToken: string,
        role: "ORGANIZER" | "ATTENDEE" | "STAFF"
    ): Promise<AuthResponse> => {
        const res = await http.post<AuthResponse>("/auth/google", {
            idToken,
            role,
        });
        return res.data;
    },
};
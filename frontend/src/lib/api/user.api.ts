import { http } from "../http";
import type { User } from "@/types/backend";

export const UserAPI = {
    createUser: async (user: Partial<User>): Promise<User> => {
        const res = await http.post<User>("/users", user);
        return res.data;
    },

    getAllUsers: async (): Promise<User[]> => {
        const res = await http.get<User[]>("/users");
        return res.data;
    },
};
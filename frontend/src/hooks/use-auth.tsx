import { createContext, useContext, useState } from 'react';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: 'organizer';
}

const AuthContext = createContext<unknown>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
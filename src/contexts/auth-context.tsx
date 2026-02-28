"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import type { User, UserRole } from "@/types";
import {
    mockLogin,
    saveSession,
    getSession,
    clearSession,
} from "@/lib/mock-auth";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => { success: boolean; error?: string };
    logout: () => void;
    hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider
 * ────────────
 * Membungkus seluruh app dengan auth state.
 * - Pada mount, cek localStorage untuk session yang tersimpan.
 * - Redirect ke /login jika belum login dan berada di area dashboard.
 * - Redirect ke / jika sudah login dan berada di halaman /login.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Cek session saat pertama kali mount
    React.useEffect(() => {
        const session = getSession();
        if (session) {
            setUser(session);
        }
        setIsLoading(false);
    }, []);

    // Guard: redirect logic
    React.useEffect(() => {
        if (isLoading) return;

        const isLoginPage = pathname === "/login";

        if (!user && !isLoginPage) {
            // Belum login → redirect ke login
            router.replace("/login");
        } else if (user && isLoginPage) {
            // Sudah login → redirect ke dashboard
            router.replace("/");
        }
    }, [user, isLoading, pathname, router]);

    const login = (email: string, password: string) => {
        const result = mockLogin(email, password);
        if (result) {
            setUser(result);
            saveSession(result);
            router.replace("/");
            return { success: true };
        }
        return { success: false, error: "Email atau password salah" };
    };

    const logout = () => {
        setUser(null);
        clearSession();
        router.replace("/login");
    };

    const hasRole = (roles: UserRole[]) => {
        if (!user) return false;
        return roles.includes(user.role);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth Hook
 * ────────────
 * Custom hook untuk mengakses auth state dari komponen manapun.
 */
export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

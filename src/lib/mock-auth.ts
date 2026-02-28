import type { User, UserRole } from "@/types";

/**
 * Mock Users Database
 * ────────────────────
 * Tiga akun dummy untuk mewakili setiap peran (role).
 * Password tidak di-hash karena ini hanya mock untuk development.
 */
export const MOCK_USERS: (User & { password: string })[] = [
    {
        id: "usr_super_001",
        email: "admin@sekolah.com",
        name: "Super Admin",
        role: "super_admin",
        school_id: "sch_001",
        password: "password123",
    },
    {
        id: "usr_admin_001",
        email: "tu@sekolah.com",
        name: "Staf TU",
        role: "admin",
        school_id: "sch_001",
        password: "password123",
    },
    {
        id: "usr_fin_001",
        email: "keuangan@sekolah.com",
        name: "Staf Keuangan",
        role: "staf_keuangan",
        school_id: "sch_001",
        password: "password123",
    },
];

/**
 * Mock Login
 * ──────────
 * Mencari user berdasarkan email & password.
 * Mengembalikan user tanpa field password jika cocok.
 */
export function mockLogin(
    email: string,
    password: string
): User | null {
    const found = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
    );
    if (!found) return null;

    // Omit password dari return
    const { password: _, ...user } = found;
    return user;
}

/**
 * Session Key
 * ───────────
 * Key untuk menyimpan session di localStorage.
 */
export const SESSION_KEY = "sims_mock_session";

/**
 * Simpan session ke localStorage
 */
export function saveSession(user: User): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
}

/**
 * Ambil session dari localStorage
 */
export function getSession(): User | null {
    if (typeof window !== "undefined") {
        const raw = localStorage.getItem(SESSION_KEY);
        if (raw) {
            try {
                return JSON.parse(raw) as User;
            } catch {
                return null;
            }
        }
    }
    return null;
}

/**
 * Hapus session (logout)
 */
export function clearSession(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_KEY);
    }
}

/**
 * Cek apakah role punya akses ke path tertentu
 */
export function hasAccess(role: UserRole, allowedRoles: UserRole[]): boolean {
    return allowedRoles.includes(role);
}

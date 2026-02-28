import type { UserRole } from "@/types";

export interface NavItem {
    title: string;
    href: string;
    icon: string;
    roles: UserRole[];
    children?: NavItem[];
}

export const navigationConfig: NavItem[] = [
    {
        title: "Dashboard",
        href: "/",
        icon: "LayoutDashboard",
        roles: ["super_admin", "admin", "staf_keuangan"],
    },
    {
        title: "Manajemen Siswa",
        href: "/siswa",
        icon: "Users",
        roles: ["super_admin", "admin"],
        children: [
            {
                title: "Daftar Siswa",
                href: "/siswa",
                icon: "List",
                roles: ["super_admin", "admin"],
            },
            {
                title: "Import Excel",
                href: "/siswa/import",
                icon: "FileUp",
                roles: ["super_admin", "admin"],
            },
            {
                title: "Naik Kelas",
                href: "/siswa/naik-kelas",
                icon: "ArrowUpCircle",
                roles: ["super_admin", "admin"],
            },
        ],
    },
    {
        title: "Keuangan",
        href: "/keuangan",
        icon: "Wallet",
        roles: ["super_admin", "staf_keuangan"],
        children: [
            {
                title: "Pembayaran",
                href: "/keuangan/pembayaran",
                icon: "CreditCard",
                roles: ["super_admin", "staf_keuangan"],
            },
            {
                title: "Tagihan",
                href: "/keuangan/tagihan",
                icon: "FileText",
                roles: ["super_admin", "staf_keuangan"],
            },
            {
                title: "Laporan",
                href: "/keuangan/laporan",
                icon: "BarChart3",
                roles: ["super_admin", "staf_keuangan"],
            },
        ],
    },
    {
        title: "Pengaturan",
        href: "/pengaturan",
        icon: "Settings",
        roles: ["super_admin", "admin"],
        children: [
            {
                title: "Pengguna",
                href: "/pengaturan/pengguna",
                icon: "UserCog",
                roles: ["super_admin"],
            },
            {
                title: "Profil Sekolah",
                href: "/pengaturan/sekolah",
                icon: "School",
                roles: ["super_admin", "admin"],
            },
            {
                title: "WhatsApp",
                href: "/pengaturan/whatsapp",
                icon: "MessageCircle",
                roles: ["super_admin"],
            },
        ],
    },
    {
        title: "Log Aktivitas",
        href: "/log-aktivitas",
        icon: "History",
        roles: ["super_admin"],
    },
];

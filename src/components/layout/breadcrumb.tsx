"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
    "": "Dashboard",
    siswa: "Manajemen Siswa",
    import: "Import Excel",
    "naik-kelas": "Naik Kelas",
    keuangan: "Keuangan",
    pembayaran: "Pembayaran",
    tagihan: "Tagihan",
    laporan: "Laporan",
    pengaturan: "Pengaturan",
    pengguna: "Pengguna",
    sekolah: "Profil Sekolah",
    whatsapp: "WhatsApp",
    "log-aktivitas": "Log Aktivitas",
};

export function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    // Pada halaman dashboard utama, tidak perlu breadcrumb
    if (segments.length === 0) return null;

    return (
        <nav className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link
                href="/"
                className="flex items-center gap-1 hover:text-foreground transition-luxury"
            >
                <Home className="h-3.5 w-3.5" />
                <span>Dashboard</span>
            </Link>
            {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const label = routeLabels[segment] || segment;
                const isLast = index === segments.length - 1;

                return (
                    <span key={href} className="flex items-center gap-1.5">
                        <ChevronRight className="h-3.5 w-3.5" />
                        {isLast ? (
                            <span className="text-foreground font-medium">{label}</span>
                        ) : (
                            <Link
                                href={href}
                                className="hover:text-foreground transition-luxury"
                            >
                                {label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}

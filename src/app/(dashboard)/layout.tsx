"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading } = useAuth();
    const [collapsed, setCollapsed] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // Tampilkan skeleton loading saat mengecek session
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Jangan render dashboard jika belum login (auth-context akan redirect)
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <Sidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed(!collapsed)}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />
            <Topbar
                collapsed={collapsed}
                onToggleSidebar={() => setCollapsed(!collapsed)}
                onMobileOpen={() => setMobileOpen(true)}
            />
            <main
                className={cn(
                    "transition-all duration-300 p-6",
                    // Desktop: push content based on sidebar state
                    collapsed ? "md:ml-[72px]" : "md:ml-60"
                )}
            >
                {children}
            </main>
        </div>
    );
}

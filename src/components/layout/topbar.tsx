"use client";

import {
    Bell,
    Search,
    PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { Breadcrumb } from "@/components/layout/breadcrumb";

const roleLabels: Record<string, string> = {
    super_admin: "Super Admin",
    admin: "Admin TU",
    staf_keuangan: "Staf Keuangan",
};

interface TopbarProps {
    collapsed: boolean;
    onToggleSidebar: () => void;
    onMobileOpen: () => void;
}

export function Topbar({ collapsed, onToggleSidebar, onMobileOpen }: TopbarProps) {
    const { user, logout } = useAuth();

    // Generate initials dari nama
    const initials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "??";

    return (
        <header
            className={cn(
                "sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-6 transition-all duration-300",
                // Desktop: adjust margin based on sidebar state
                collapsed ? "md:ml-[72px]" : "md:ml-60"
            )}
        >
            {/* Desktop toggle — collapse/expand */}
            <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                onClick={onToggleSidebar}
            >
                <PanelLeft className="h-5 w-5" />
            </Button>

            {/* Mobile toggle — open overlay sidebar */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onMobileOpen}
            >
                <PanelLeft className="h-5 w-5" />
            </Button>

            {/* Breadcrumb — inline in topbar */}
            <Breadcrumb />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right group: Search, Bell, Profile */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <div className="hidden sm:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Cari... (Ctrl+K)"
                            className="h-9 w-56 rounded-lg border-luxury border-border bg-muted/50 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-luxury"
                        />
                    </div>
                </div>

                {/* Mobile search icon */}
                <Button variant="ghost" size="icon" className="sm:hidden">
                    <Search className="h-5 w-5" />
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                        3
                    </span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2 px-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:flex flex-col items-start">
                                <span className="text-sm font-medium">
                                    {user?.name || "Guest"}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    {user ? roleLabels[user.role] || user.role : "—"}
                                </span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 shadow-luxury-md">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{user?.name}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                                <Badge variant="outline" className="w-fit text-[10px] mt-1">
                                    {user ? roleLabels[user.role] : "—"}
                                </Badge>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profil Saya</DropdownMenuItem>
                        <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={logout}
                        >
                            Keluar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

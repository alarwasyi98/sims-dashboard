"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Wallet,
    Settings,
    History,
    CreditCard,
    FileText,
    BarChart3,
    UserCog,
    School,
    MessageCircle,
    List,
    FileUp,
    ArrowUpCircle,
    ChevronDown,
    ChevronsUpDown,
    Moon,
    Sun,
    LogOut,
    PanelLeftClose,
    PanelLeft,
    Palette,
    Check,
    type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { navigationConfig, type NavItem } from "@/lib/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useSchool } from "@/contexts/school-context";

const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard,
    Users,
    Wallet,
    Settings,
    History,
    CreditCard,
    FileText,
    BarChart3,
    UserCog,
    School,
    MessageCircle,
    List,
    FileUp,
    ArrowUpCircle,
};

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { user, logout, hasRole } = useAuth();
    const { schools, activeSchool, setActiveSchool } = useSchool();
    const [expandedGroups, setExpandedGroups] = React.useState<string[]>([]);

    // Filter navigasi berdasarkan peran user
    const filteredNav = React.useMemo(() => {
        if (!user) return [];
        return navigationConfig
            .filter((item) => hasRole(item.roles))
            .map((item) => ({
                ...item,
                children: item.children?.filter((child) => hasRole(child.roles)),
            }));
    }, [user, hasRole]);

    // Auto-expand active group
    React.useEffect(() => {
        const activeGroup = filteredNav.find(
            (item) =>
                item.children &&
                item.children.some((child) => pathname.startsWith(child.href))
        );
        if (activeGroup && !expandedGroups.includes(activeGroup.title)) {
            setExpandedGroups((prev) => [...prev, activeGroup.title]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Close mobile sidebar on route change
    React.useEffect(() => {
        onMobileClose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const toggleGroup = (title: string) => {
        setExpandedGroups((prev) =>
            prev.includes(title)
                ? prev.filter((t) => t !== title)
                : [...prev, title]
        );
    };

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    // ─── Render: Collapsed icon-only item (desktop) ───
    const renderCollapsedItem = (item: NavItem) => {
        const Icon = iconMap[item.icon];
        const active = isActive(item.href);
        const hasChildren = item.children && item.children.length > 0;

        return (
            <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link
                        href={hasChildren ? item.children![0].href : item.href}
                        className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg transition-luxury mx-auto",
                            active
                                ? "bg-primary text-primary-foreground shadow-luxury"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        {Icon && <Icon className="h-5 w-5" />}
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="shadow-luxury-md">
                    {item.title}
                </TooltipContent>
            </Tooltip>
        );
    };

    // ─── Render: Expanded full item ───
    const renderExpandedItem = (item: NavItem) => {
        const Icon = iconMap[item.icon];
        const active = isActive(item.href);
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedGroups.includes(item.title);

        if (hasChildren) {
            return (
                <div key={item.href}>
                    <button
                        onClick={() => toggleGroup(item.title)}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-luxury",
                            active
                                ? "text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        {Icon && <Icon className="h-5 w-5 shrink-0" />}
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 shrink-0 transition-transform duration-200",
                                isExpanded && "rotate-180"
                            )}
                        />
                    </button>
                    {isExpanded && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                            {item.children!.map((child) => {
                                const ChildIcon = iconMap[child.icon];
                                const childActive = isActive(child.href);
                                return (
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-luxury",
                                            childActive
                                                ? "bg-primary/10 text-primary font-medium"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        )}
                                    >
                                        {ChildIcon && <ChildIcon className="h-4 w-4 shrink-0" />}
                                        <span>{child.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-luxury",
                    active
                        ? "bg-primary text-primary-foreground shadow-luxury"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
            >
                {Icon && <Icon className="h-5 w-5 shrink-0" />}
                <span>{item.title}</span>
            </Link>
        );
    };

    // ─── Shared sidebar content ───
    const sidebarContent = (isCollapsed: boolean) => (
        <>
            {/* Header: School Switcher + Toggle */}
            <div
                className={cn(
                    "flex h-14 items-center border-b border-border px-3",
                    isCollapsed ? "justify-center" : "justify-between gap-1"
                )}
            >
                {isCollapsed ? (
                    <DropdownMenu>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-xs hover:opacity-90 transition-luxury">
                                        {activeSchool.initial}
                                    </button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="right">{activeSchool.shortName}</TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent side="right" align="start" className="w-64 shadow-luxury-md">
                            {schools.map((school) => (
                                <DropdownMenuItem
                                    key={school.id}
                                    onClick={() => setActiveSchool(school)}
                                    className="gap-3 py-2.5"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-xs">
                                        {school.initial}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-sm font-medium truncate">{school.shortName}</span>
                                        <span className="text-[10px] text-muted-foreground truncate">{school.address}</span>
                                    </div>
                                    {activeSchool.id === school.id && <Check className="h-4 w-4 shrink-0 text-primary" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-accent transition-luxury flex-1 min-w-0 text-left">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-xs">
                                    {activeSchool.initial}
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-sm font-bold font-heading tracking-wide truncate">
                                        {activeSchool.shortName}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground truncate">
                                        {activeSchool.address}
                                    </span>
                                </div>
                                <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 shadow-luxury-md">
                            {schools.map((school) => (
                                <DropdownMenuItem
                                    key={school.id}
                                    onClick={() => setActiveSchool(school)}
                                    className="gap-3 py-2.5"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-xs">
                                        {school.initial}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-sm font-medium truncate">{school.shortName}</span>
                                        <span className="text-[10px] text-muted-foreground truncate">{school.address}</span>
                                    </div>
                                    {activeSchool.id === school.id && <Check className="h-4 w-4 shrink-0 text-primary" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                {!isCollapsed && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground hidden md:flex"
                        onClick={onToggle}
                    >
                        <PanelLeftClose className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-1.5">
                    {isCollapsed
                        ? filteredNav.map(renderCollapsedItem)
                        : filteredNav.map(renderExpandedItem)
                    }
                </nav>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border p-3 space-y-1.5">
                {isCollapsed ? (
                    <>
                        <DropdownMenu>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 mx-auto flex"
                                        >
                                            <Palette className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent side="right">Ganti Tema</TooltipContent>
                            </Tooltip>
                            <DropdownMenuContent side="right" align="end" className="shadow-luxury-md">
                                <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
                                    <Sun className="h-4 w-4" />
                                    Light
                                    {theme === "light" && <Check className="h-4 w-4 ml-auto" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
                                    <Moon className="h-4 w-4" />
                                    Dark
                                    {theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 mx-auto flex text-destructive hover:text-destructive"
                                    onClick={logout}
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Keluar</TooltipContent>
                        </Tooltip>
                        <Separator />
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 mx-auto flex"
                                    onClick={onToggle}
                                >
                                    <PanelLeft className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Perlebar Sidebar</TooltipContent>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                                >
                                    <Palette className="h-5 w-5 shrink-0" />
                                    <span>Ganti Tema</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="end" className="shadow-luxury-md">
                                <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
                                    <Sun className="h-4 w-4" />
                                    Light
                                    {theme === "light" && <Check className="h-4 w-4 ml-auto" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
                                    <Moon className="h-4 w-4" />
                                    Dark
                                    {theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                            onClick={logout}
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            <span>Keluar</span>
                        </Button>
                    </>
                )}
            </div>
        </>
    );

    return (
        <>
            {/* ══ DESKTOP / TABLET SIDEBAR ══ always visible, push content */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 hidden md:flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
                    collapsed ? "w-[72px]" : "w-60"
                )}
            >
                {sidebarContent(collapsed)}
            </aside>

            {/* ══ MOBILE SIDEBAR ══ overlay with backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
                    onClick={onMobileClose}
                    aria-hidden="true"
                />
            )}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 flex md:hidden h-screen w-60 flex-col border-r border-border bg-sidebar transition-transform duration-300 ease-in-out",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Mobile header: School Switcher + Close */}
                <div className="flex h-14 items-center justify-between gap-1 border-b border-border px-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-accent transition-luxury flex-1 min-w-0 text-left">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-xs">
                                    {activeSchool.initial}
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-sm font-bold font-heading tracking-wide truncate">
                                        {activeSchool.shortName}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground truncate">
                                        {activeSchool.address}
                                    </span>
                                </div>
                                <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 shadow-luxury-md">
                            {schools.map((school) => (
                                <DropdownMenuItem
                                    key={school.id}
                                    onClick={() => setActiveSchool(school)}
                                    className="gap-3 py-2.5"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-xs">
                                        {school.initial}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-sm font-medium truncate">{school.shortName}</span>
                                        <span className="text-[10px] text-muted-foreground truncate">{school.address}</span>
                                    </div>
                                    {activeSchool.id === school.id && <Check className="h-4 w-4 shrink-0 text-primary" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                        onClick={onMobileClose}
                    >
                        <PanelLeftClose className="h-5 w-5" />
                    </Button>
                </div>

                <ScrollArea className="flex-1 px-3 py-4">
                    <nav className="space-y-1.5">
                        {filteredNav.map(renderExpandedItem)}
                    </nav>
                </ScrollArea>

                <div className="border-t border-border p-3 space-y-1.5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                            >
                                <Palette className="h-5 w-5 shrink-0" />
                                <span>Ganti Tema</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="end" className="shadow-luxury-md">
                            <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
                                <Sun className="h-4 w-4" />
                                Light
                                {theme === "light" && <Check className="h-4 w-4 ml-auto" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
                                <Moon className="h-4 w-4" />
                                Dark
                                {theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                        onClick={logout}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        <span>Keluar</span>
                    </Button>
                </div>
            </aside>
        </>
    );
}

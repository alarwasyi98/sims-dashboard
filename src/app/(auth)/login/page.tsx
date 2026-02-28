"use client";

import * as React from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { MOCK_USERS } from "@/lib/mock-auth";

export default function LoginPage() {
    const { login, isLoading: authLoading } = useAuth();

    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        // Simulasi delay jaringan 500ms
        setTimeout(() => {
            const result = login(email, password);
            if (!result.success) {
                setError(result.error || "Terjadi kesalahan");
            }
            setIsSubmitting(false);
        }, 500);
    };

    const handleDevLogin = (userEmail: string) => {
        setEmail(userEmail);
        setPassword("password123");
    };

    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="w-full max-w-md px-4">
            <Card className="shadow-luxury-lg border-luxury">
                <CardContent className="pt-8 pb-6 px-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground font-heading font-bold text-xl mb-4 shadow-luxury">
                            S
                        </div>
                        <h1 className="text-2xl font-bold font-heading tracking-wide">
                            SIMS
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 tracking-wider uppercase text-[11px]">
                            Sistem Informasi Manajemen Sekolah
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-4 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-xs font-medium tracking-wide uppercase"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@sekolah.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-10"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-xs font-medium tracking-wide uppercase"
                            >
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-10 pr-10"
                                    required
                                    disabled={isSubmitting}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-10 w-10"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label
                                htmlFor="remember"
                                className="text-sm text-muted-foreground cursor-pointer"
                            >
                                Ingat saya
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-10 font-semibold tracking-wide shadow-luxury"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                "MASUK"
                            )}
                        </Button>
                    </form>
                </CardContent>

                {/* Dev Mode Badge */}
                <CardFooter className="flex flex-col gap-3 pb-6 px-8">
                    <div className="w-full border-t border-border pt-4">
                        <p className="text-center text-[10px] text-muted-foreground mb-3 tracking-wider uppercase">
                            🔧 Dev Mode — Klik akun untuk autofill
                        </p>
                        <div className="space-y-2">
                            {MOCK_USERS.map((mockUser) => (
                                <button
                                    key={mockUser.id}
                                    onClick={() => handleDevLogin(mockUser.email)}
                                    className="w-full flex items-center justify-between rounded-lg border border-border px-3 py-2 text-left transition-luxury hover:bg-muted group"
                                >
                                    <div>
                                        <p className="text-xs font-medium group-hover:text-foreground">
                                            {mockUser.name}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground font-mono">
                                            {mockUser.email}
                                        </p>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="text-[9px] shrink-0"
                                    >
                                        {mockUser.role === "super_admin"
                                            ? "Super Admin"
                                            : mockUser.role === "admin"
                                                ? "Admin TU"
                                                : "Keuangan"}
                                    </Badge>
                                </button>
                            ))}
                        </div>
                    </div>
                </CardFooter>
            </Card>

            <p className="text-center text-xs text-muted-foreground mt-6">
                © 2026 SIMS — Powered by Supabase
            </p>
        </div>
    );
}

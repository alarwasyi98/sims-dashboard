"use client";

export function LoadingScreen() {
    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar Skeleton */}
            <aside className="hidden md:flex w-60 flex-col border-r border-border bg-sidebar shrink-0">
                {/* Logo area */}
                <div className="flex h-14 items-center gap-3 border-b border-border px-4">
                    <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
                    <div className="flex flex-col gap-1.5">
                        <div className="h-3.5 w-16 rounded bg-muted animate-pulse" />
                        <div className="h-2.5 w-24 rounded bg-muted animate-pulse" />
                    </div>
                </div>

                {/* Nav items */}
                <div className="flex-1 px-3 py-4 space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                            <div className="h-5 w-5 rounded bg-muted animate-pulse shrink-0" />
                            <div
                                className="h-3.5 rounded bg-muted animate-pulse"
                                style={{ width: `${60 + (i % 4) * 10}%` }}
                            />
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar Skeleton */}
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-6">
                    <div className="h-8 w-8 rounded bg-muted animate-pulse" />
                    <div className="flex-1" />
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-48 rounded-lg bg-muted animate-pulse hidden sm:block" />
                        <div className="h-8 w-8 rounded bg-muted animate-pulse" />
                        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                    </div>
                </header>

                {/* Content Skeleton */}
                <main className="p-6 space-y-8">
                    {/* Page header */}
                    <div className="space-y-2">
                        <div className="h-7 w-40 rounded bg-muted animate-pulse" />
                        <div className="h-4 w-72 rounded bg-muted animate-pulse" />
                    </div>

                    {/* Stat cards */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-border bg-card p-6 shadow-luxury space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="h-3.5 w-24 rounded bg-muted animate-pulse" />
                                    <div className="h-4 w-4 rounded bg-muted animate-pulse" />
                                </div>
                                <div className="h-7 w-20 rounded bg-muted animate-pulse" />
                                <div className="h-3 w-32 rounded bg-muted animate-pulse" />
                            </div>
                        ))}
                    </div>

                    {/* Chart placeholders */}
                    <div className="grid gap-6 lg:grid-cols-7">
                        <div className="lg:col-span-4 rounded-xl border border-border bg-card p-6 shadow-luxury">
                            <div className="h-4 w-48 rounded bg-muted animate-pulse mb-6" />
                            <div className="h-[240px] rounded-lg bg-muted/30 animate-pulse" />
                        </div>
                        <div className="lg:col-span-3 rounded-xl border border-border bg-card p-6 shadow-luxury">
                            <div className="h-4 w-36 rounded bg-muted animate-pulse mb-6" />
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
                                            <div className="space-y-1.5">
                                                <div className="h-3.5 w-20 rounded bg-muted animate-pulse" />
                                                <div className="h-2.5 w-14 rounded bg-muted animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="h-3.5 w-16 rounded bg-muted animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

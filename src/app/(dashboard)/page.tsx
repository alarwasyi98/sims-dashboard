import {
    BarChart3,
    Users,
    Wallet,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
    {
        title: "Total Siswa",
        value: "1.247",
        change: "+12",
        trend: "up" as const,
        icon: Users,
        description: "siswa baru bulan ini",
    },
    {
        title: "Pendapatan Bulan Ini",
        value: "Rp 128,5 Jt",
        change: "+8.3%",
        trend: "up" as const,
        icon: Wallet,
        description: "dari bulan lalu",
    },
    {
        title: "Kehadiran Hari Ini",
        value: "94.2%",
        change: "-1.5%",
        trend: "down" as const,
        icon: BarChart3,
        description: "dari rata-rata",
    },
    {
        title: "Tunggakan",
        value: "23",
        change: "siswa",
        trend: "neutral" as const,
        icon: AlertTriangle,
        description: "belum lunas > 2 bulan",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold font-heading tracking-wide">
                    Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                    Selamat datang, Admin. Berikut ringkasan hari ini.
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card
                        key={stat.title}
                        className="shadow-luxury border-luxury transition-luxury hover:shadow-luxury-md"
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-heading tracking-wide">
                                {stat.value}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                {stat.trend === "up" && (
                                    <TrendingUp className="h-3 w-3 text-success" />
                                )}
                                {stat.trend === "down" && (
                                    <TrendingDown className="h-3 w-3 text-destructive" />
                                )}
                                <span
                                    className={
                                        stat.trend === "up"
                                            ? "text-success"
                                            : stat.trend === "down"
                                                ? "text-destructive"
                                                : ""
                                    }
                                >
                                    {stat.change}
                                </span>{" "}
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts + Widgets */}
            <div className="grid gap-6 lg:grid-cols-7">
                {/* Tren Kehadiran */}
                <Card className="lg:col-span-4 shadow-luxury border-luxury">
                    <CardHeader>
                        <CardTitle className="text-base font-heading">
                            Tren Kehadiran — 30 Hari
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-[240px] items-center justify-center rounded-lg bg-muted/30">
                            <div className="text-center text-muted-foreground">
                                <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Grafik Line Chart</p>
                                <p className="text-xs">Siswa & Guru — 30 hari terakhir</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Top 5 Penunggak */}
                <Card className="lg:col-span-3 shadow-luxury border-luxury">
                    <CardHeader>
                        <CardTitle className="text-base font-heading">
                            🏆 Top 5 Penunggak
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Ahmad R.", amount: "Rp 3,2 Jt", class: "7A" },
                                { name: "Siti K.", amount: "Rp 2,8 Jt", class: "8B" },
                                { name: "Budi S.", amount: "Rp 2,1 Jt", class: "9A" },
                                { name: "Dewi L.", amount: "Rp 1,9 Jt", class: "7C" },
                                { name: "Rizki M.", amount: "Rp 1,5 Jt", class: "8A" },
                            ].map((item, i) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Kelas {item.class}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-mono font-medium text-destructive">
                                        {item.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Log & Cash Flow */}
            <div className="grid gap-6 lg:grid-cols-7">
                {/* Arus Kas */}
                <Card className="lg:col-span-4 shadow-luxury border-luxury">
                    <CardHeader>
                        <CardTitle className="text-base font-heading">
                            Arus Kas Masuk — 6 Bulan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-[200px] items-center justify-center rounded-lg bg-muted/30">
                            <div className="text-center text-muted-foreground">
                                <Wallet className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Grafik Bar Chart</p>
                                <p className="text-xs">Sep — Feb (prediksi)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Log Aktivitas */}
                <Card className="lg:col-span-3 shadow-luxury border-luxury">
                    <CardHeader>
                        <CardTitle className="text-base font-heading">
                            📋 Log Aktivitas Terkini
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    time: "14:32",
                                    user: "Admin A",
                                    action: "Input bayar #SPP-0892",
                                },
                                {
                                    time: "14:15",
                                    user: "Staf B",
                                    action: "Tambah siswa baru",
                                },
                                {
                                    time: "13:50",
                                    user: "Super Admin",
                                    action: "Update konfigurasi WA",
                                },
                                {
                                    time: "13:22",
                                    user: "Admin A",
                                    action: "Ekspor data siswa kelas 7",
                                },
                                {
                                    time: "12:45",
                                    user: "Staf B",
                                    action: "Input bayar #SPP-0891",
                                },
                            ].map((log) => (
                                <div
                                    key={log.time + log.action}
                                    className="flex gap-3 py-2 border-b border-border last:border-0"
                                >
                                    <span className="text-xs text-muted-foreground font-mono whitespace-nowrap mt-0.5">
                                        🕐 {log.time}
                                    </span>
                                    <div>
                                        <p className="text-sm">
                                            <span className="font-medium">{log.user}</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {log.action}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

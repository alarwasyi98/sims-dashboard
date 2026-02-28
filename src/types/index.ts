export type UserRole = "super_admin" | "admin" | "staf_keuangan";

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    school_id: string;
    avatar_url?: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon: string;
    roles: UserRole[];
    children?: NavItem[];
}

export interface Student {
    id: string;
    nis: string;
    name: string;
    class: string;
    gender: "L" | "P";
    birth_date: string;
    birth_place: string;
    address: string;
    phone_parent: string;
    photo_url?: string;
    status: "aktif" | "alumni" | "keluar";
    financial_status: "lunas" | "sebagian" | "tunggakan";
    school_id: string;
}

export interface BillingItem {
    id: string;
    student_id: string;
    pos_name: string;
    amount: number;
    paid: number;
    remaining: number;
    due_date: string;
    status: "lunas" | "cicilan" | "belum_bayar";
}

export interface Payment {
    id: string;
    student_id: string;
    billing_id: string;
    amount: number;
    method: "tunai" | "transfer";
    date: string;
    receipt_number: string;
}

"use client";

import * as React from "react";

export interface SchoolInfo {
    id: string;
    name: string;
    shortName: string;
    initial: string;
    address: string;
}

// Mock data — akan diganti dengan API call nanti
const mockSchools: SchoolInfo[] = [
    {
        id: "sch-001",
        name: "SMP Islam Terpadu Al-Furqon",
        shortName: "SMPIT Al-Furqon",
        initial: "AF",
        address: "Jl. Pendidikan No. 12, Bandung",
    },
    {
        id: "sch-002",
        name: "SMP Islam Terpadu An-Nahl",
        shortName: "SMPIT An-Nahl",
        initial: "AN",
        address: "Jl. Mawar No. 5, Cimahi",
    },
    {
        id: "sch-003",
        name: "SD Islam Terpadu Al-Furqon",
        shortName: "SDIT Al-Furqon",
        initial: "SD",
        address: "Jl. Pendidikan No. 14, Bandung",
    },
];

interface SchoolContextType {
    schools: SchoolInfo[];
    activeSchool: SchoolInfo;
    setActiveSchool: (school: SchoolInfo) => void;
}

const SchoolContext = React.createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({ children }: { children: React.ReactNode }) {
    const [activeSchool, setActiveSchool] = React.useState<SchoolInfo>(mockSchools[0]);

    return (
        <SchoolContext.Provider value={{ schools: mockSchools, activeSchool, setActiveSchool }}>
            {children}
        </SchoolContext.Provider>
    );
}

export function useSchool() {
    const context = React.useContext(SchoolContext);
    if (context === undefined) {
        throw new Error("useSchool must be used within a SchoolProvider");
    }
    return context;
}

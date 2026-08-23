"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { countries } from "@/lib/auth/countries";

export function CountryCodeSelect({ value = "+91", onChange, className = "" }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef(null);

    const selectedCountry = countries.find((c) => c.dial_code === value) || countries[0];

    const filtered = countries.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.dial_code.includes(search) ||
            c.code.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 h-11 px-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-xs font-semibold text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/80 transition-colors shadow-xs"
            >
                <span className="text-base leading-none">{selectedCountry.flag}</span>
                <span>{selectedCountry.dial_code}</span>
                <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />
            </button>

            {open && (
                <div className="absolute top-12 left-0 z-50 w-64 max-h-72 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f1117] shadow-2xl p-2 overflow-hidden flex flex-col animate-in fade-in zoom-in-95">
                    <div className="relative mb-2">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search country or code..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-8 pl-8 pr-2 text-xs rounded-lg border border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            autoFocus
                        />
                    </div>

                    <div className="overflow-y-auto flex-1 space-y-0.5 max-h-56">
                        {filtered.length > 0 ? (
                            filtered.map((country) => (
                                <button
                                    key={`${country.code}-${country.dial_code}`}
                                    type="button"
                                    onClick={() => {
                                        onChange(country.dial_code);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                                        country.dial_code === value
                                            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold"
                                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-base leading-none">{country.flag}</span>
                                        <span className="truncate max-w-[130px]">{country.name}</span>
                                    </div>
                                    <span className="font-mono text-[11px] opacity-70">{country.dial_code}</span>
                                </button>
                            ))
                        ) : (
                            <p className="text-center py-4 text-xs text-zinc-500">No countries found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

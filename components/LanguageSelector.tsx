"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 px-2 py-1 bg-muted/50 rounded-full border border-border/50">
            <Globe className="w-3 h-3 text-muted-foreground" />
            <div
                className="relative flex items-center h-6 w-24 bg-background/50 rounded-full border border-border p-1 cursor-pointer select-none"
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
            >
                {/* EN Label */}
                <span className={`flex-1 text-[10px] font-bold text-center z-10 transition-colors duration-200 ${language === "en" ? "text-white" : "text-muted-foreground"}`}>
                    EN
                </span>
                {/* ES Label */}
                <span className={`flex-1 text-[10px] font-bold text-center z-10 transition-colors duration-200 ${language === "es" ? "text-white" : "text-muted-foreground"}`}>
                    ES
                </span>

                {/* Slider Thumb */}
                <div
                    className={`absolute h-4 w-[42px] bg-gradient-to-r from-orange-600 to-red-600 rounded-full transition-transform duration-300 ease-in-out shadow-sm ${language === "en" ? "translate-x-0" : "translate-x-[44px]"
                        }`}
                />
            </div>
        </div>
    );
}

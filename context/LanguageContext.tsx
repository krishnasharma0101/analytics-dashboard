"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        "dashboard": "Dashboard",
        "residents": "Residents",
        "business_analytics": "Business Analytics",
        "demographics": "Demographics",
        "ai_insights": "AI Insights",
        "whatsapp": "WhatsApp",
        "settings": "Settings",
        "system_online": "System Online",
        "admin_access": "Admin Access",
        "recent_activity": "Recent Activity",
        "revenue_trend": "Revenue Trend",
        "total_citizens": "Total Citizens",
        "total_tourists": "Total Tourists",
        "active_businesses": "Active Businesses",
        "growth": "Growth",
        "good_morning": "Good Morning",
        "good_afternoon": "Good Afternoon",
        "good_evening": "Good Evening",
        "lanzarote_town_hall": "Lanzarote Town Hall",
        "search": "Search...",
        "all_systems_operational": "All Systems Operational",
        "mayor": "Mayor",
        "admin": "Admin",
        "recent_actions": "Latest actions & events",
        "revenue_description": "Monthly municipal revenue (past 12m)",
        "citizen_records": "Citizen Records",
        "view_demographics": "View demographics & records",
        "revenue_insights": "Revenue & sector insights",
        "population_data": "Population & age data",
        "ask_questions": "Ask questions about city data",
        "census_registered": "census registered",
        "registered_entities": "registered entities",
        "municipal_estimate": "municipal estimate",
        "by_air_cruise": "by air & cruise",
        "menu": "Menu",
        "ai_assistant": "AI Assistant",
        "type_message": "Type message...",
        "ask_something": "Ask about Lanzarote",
        "municipalities": "Municipalities",
        "satisfaction": "Satisfaction",
        "top_districts": "Top Municipalities",
        "performance": "Performance Overview",
        "quick_links": "Quick Links",
        "citizen_collection": "Citizen Collection",
        "sync_data": "Sync Data",
        "add_citizen": "Add Citizen",
        "total_records": "Total Records",
        "verified_citizens": "Verified Citizens",
        "new_registrations": "New Registrants",
        "pending_review": "Pending Review",
        "data_collection_progress": "Collection Progress",
        "district_collection_rate": "Rates by Town",
        "verification_status": "Verification Status",
        "export": "Export",
        "filter": "Filter",
        "all": "All",
        "verified": "Verified",
        "pending": "Pending",
        "unverified": "Unverified",
        "dob": "DOB",
        "contact": "Contact",
        "documents": "Documents",
        "status": "Status",
        "last_updated": "Updated",
        "intelligence": "Intelligence",
        "ask_anything": "Ask about city data...",
        "records_found": "records found",
        "search_placeholder": "Search name, ID, email, town…",
        "fully_verified": "Fully Verified",
        "partially_verified": "Partially Verified",
        "under_review": "Under Review",
        "ai_powered": "AI-Powered Insights",
        "try_now": "Try it now",
        "get_instant_answers": "Get instant answers about city data. Ask about demographics, revenue trends, or district comparisons.",
    },
    es: {
        "dashboard": "Panel de Control",
        "residents": "Residentes",
        "business_analytics": "Análisis de Negocios",
        "demographics": "Demografía",
        "ai_insights": "Perspectivas IA",
        "whatsapp": "WhatsApp",
        "settings": "Ajustes",
        "system_online": "Sistema en Línea",
        "admin_access": "Acceso de Admin",
        "recent_activity": "Actividad Reciente",
        "revenue_trend": "Tendencia de Ingresos",
        "total_citizens": "Total de Ciudadanos",
        "total_tourists": "Total de Turistas",
        "active_businesses": "Negocios Activos",
        "growth": "Crecimiento",
        "good_morning": "Buenos Días",
        "good_afternoon": "Buenas Tardes",
        "good_evening": "Buenas Noches",
        "lanzarote_town_hall": "Ayuntamiento de Lanzarote",
        "search": "Buscar...",
        "all_systems_operational": "Sistemas Operativos",
        "mayor": "Alcalde",
        "admin": "Admin",
        "recent_actions": "Últimas acciones y eventos",
        "revenue_description": "Ingresos mensuales (12 meses)",
        "citizen_records": "Registros de Ciudadanos",
        "view_demographics": "Ver demografía y registros",
        "revenue_insights": "Ingresos y sectores",
        "population_data": "Población y edad",
        "ask_questions": "Preguntas de datos",
        "census_registered": "censo registrado",
        "registered_entities": "entidades registradas",
        "municipal_estimate": "estimación municipal",
        "by_air_cruise": "por aire y crucero",
        "menu": "Menú",
        "ai_assistant": "Asistente IA",
        "type_message": "Escriba mensaje...",
        "ask_something": "Preguntar sobre Lanzarote",
        "municipalities": "Municipios",
        "satisfaction": "Satisfacción",
        "top_districts": "Municipios Principales",
        "performance": "Resumen de Rendimiento",
        "quick_links": "Enlaces Rápidos",
        "citizen_collection": "Gestión de Ciudadanos",
        "sync_data": "Sincronizar",
        "add_citizen": "Nuevo Ciudadano",
        "total_records": "Total Registros",
        "verified_citizens": "Verificados",
        "new_registrations": "Nuevos Registros",
        "pending_review": "Pendiente de Revisión",
        "data_collection_progress": "Progreso de Datos",
        "district_collection_rate": "Tasa por Municipio",
        "verification_status": "Estado Verificación",
        "export": "Exportar",
        "filter": "Filtrar",
        "all": "Todos",
        "verified": "Verificados",
        "pending": "Pendientes",
        "unverified": "No Verificados",
        "dob": "F. Nacimiento",
        "contact": "Contacto",
        "documents": "Docs",
        "status": "Estado",
        "last_updated": "Actualizado",
        "intelligence": "Inteligencia",
        "ask_anything": "Pregunte sobre los datos...",
        "records_found": "registros encontrados",
        "search_placeholder": "Buscar nombre, ID, email, municipio…",
        "fully_verified": "Totalmente Verificado",
        "partially_verified": "Parcialmente Verificado",
        "under_review": "En Revisión",
        "ai_powered": "Perspectivas con Inteligencia Artificial",
        "try_now": "Pruébalo ahora",
        "get_instant_answers": "Obtenga respuestas al instante sobre los datos municipales. Pregunte sobre demografía, tendencias o comparaciones.",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

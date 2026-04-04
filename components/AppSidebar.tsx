"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  UserCircle,
  MessageSquare,
  MessageCircle,
  Settings,
  ShieldCheck,
  Zap,
  ChevronsUpDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { label: "Dashboard", key: "dashboard", href: "/", icon: LayoutDashboard },
  { label: "Residents", key: "residents", href: "/citizens", icon: Users },
  { label: "Business Analytics", key: "business_analytics", href: "/analytics/business", icon: BarChart3 },
  { label: "Demographics", key: "demographics", href: "/analytics/people", icon: UserCircle },
  { label: "AI Insights", key: "ai_insights", href: "/ai-chatbot", icon: MessageSquare, badge: "NEW" },
  { label: "WhatsApp", key: "whatsapp", href: "/messaging", icon: MessageCircle },
  { label: "Settings", key: "settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { t } = useLanguage();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* ── Header / Brand ── */}
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2 transition-all duration-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="CIUDADANIA - Lanzarote" className="hover:bg-sidebar-accent">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                <span className="font-bold text-sm tracking-tight uppercase">CIUDADANIA</span>
                <span className="text-[10px] font-bold text-sidebar-foreground/50 tracking-wider uppercase">{t("lanzarote_town_hall")}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Navigation ── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-[10px] tracking-widest font-bold text-sidebar-foreground/40">
            {t("menu")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      tooltip={t(item.key)}
                      isActive={active}
                      className="transition-all duration-200"
                    >
                      <item.icon className="shrink-0" />
                      <span>{t(item.key)}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>
                        <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-black rounded-full bg-blue-100 text-blue-700 border-0">
                          {item.badge}
                        </Badge>
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="p-3 group-data-[collapsible=icon]:p-2 transition-all duration-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="System Status" className="hover:bg-sidebar-accent">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm">
                <Zap className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-sidebar" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold">{t("system_online")}</span>
                <span className="text-xs text-sidebar-foreground/50">{t("admin_access")}</span>
              </div>
              <ChevronsUpDown className="ml-auto w-4 h-4 text-sidebar-foreground/30 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

"use client";

import { Bell, Search, Settings, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-background/80 backdrop-blur-xl px-6">
      {/* Sidebar toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-5" />
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-foreground">City Hall</span>
          <span className="text-muted-foreground text-sm">/</span>
          <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Municipality of Madrid
          </span>
        </div>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <Button variant="outline" size="sm" className="hidden sm:flex gap-2 text-muted-foreground font-normal w-40 justify-start">
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs">Search...</span>
          <kbd className="ml-auto text-[10px] font-mono text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-background" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 hidden sm:block" />

        {/* Profile */}
        <Button variant="ghost" size="sm" className="gap-2.5 px-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center ring-2 ring-border">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-xs font-semibold leading-none">Admin</span>
            <span className="text-[10px] text-muted-foreground leading-none mt-0.5">Mayor</span>
          </div>
        </Button>
      </div>
    </header>
  );
}

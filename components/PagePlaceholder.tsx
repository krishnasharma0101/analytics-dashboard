import { LucideIcon, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PagePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function PagePlaceholder({
  title,
  description,
  icon: Icon,
}: PagePlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8 animate-fade-in">
      <div className="glass-container flex flex-col items-center text-center max-w-lg w-full">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 mb-6">
          <Icon className="w-7 h-7 text-primary" strokeWidth={1.8} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-3">
          {title}
        </h1>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-8">
          {description}
        </p>

        {/* Status chips */}
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 text-xs font-semibold px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
            Service Active
          </Badge>
          <Badge variant="outline" className="gap-1.5 text-xs font-semibold px-3 py-1">
            <Sparkles className="w-3 h-3 text-primary" />
            Ready
          </Badge>
        </div>
      </div>
    </div>
  );
}

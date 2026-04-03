import { LucideIcon, Sparkles } from "lucide-react";

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
    <div className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] animate-fade-in">
      {/* Visual Depth Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-multiply opacity-[0.03]"
          style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)" }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-multiply opacity-[0.03]"
          style={{ background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)" }}
        />
      </div>

      <div className="relative glass-container flex flex-col items-center text-center max-w-2xl w-full">
        {/* Modern Icon Frame */}
        <div 
          className="flex items-center justify-center rounded-[28px] mb-8 bg-slate-50 border border-slate-100 shadow-sm transition-transform hover:rotate-3"
          style={{ width: "80px", height: "80px" }}
        >
          <Icon size={32} strokeWidth={2} className="text-blue-500" />
        </div>

        {/* Text Group */}
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-base text-slate-500 leading-relaxed max-w-md mx-auto mb-10">
          {description}
        </p>

        {/* Activity Indicator (Premium Status) */}
        <div className="flex items-center gap-6 px-10 py-6 rounded-3xl bg-slate-50/80 border border-slate-200/60 shadow-inner">
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[13px] font-bold text-slate-700">Service Active</span>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Intelligence</span>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-blue-500" />
              <span className="text-[13px] font-bold text-slate-700">Insights Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

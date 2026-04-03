import { LucideIcon } from "lucide-react";

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
    <div className="page-content flex flex-col items-center justify-center min-h-[calc(100vh-72px)]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(29, 78, 216, 0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Card content */}
      <div className="relative glass-card p-10 sm:p-14 text-center max-w-lg w-full mx-4">
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center rounded-2xl mb-6"
          style={{
            width: "72px",
            height: "72px",
            background: "var(--accent-gradient-subtle)",
            border: "1px solid rgba(29, 78, 216, 0.12)",
          }}
        >
          <Icon
            size={32}
            style={{ color: "var(--primary)" }}
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="text-base leading-relaxed mb-8"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider"
          style={{
            background: "rgba(29, 78, 216, 0.06)",
            color: "var(--primary)",
            border: "1px solid rgba(29, 78, 216, 0.1)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#22c55e",
              boxShadow: "0 0 6px rgba(34, 197, 94, 0.4)",
            }}
          />
          Module Ready
        </div>
      </div>
    </div>
  );
}

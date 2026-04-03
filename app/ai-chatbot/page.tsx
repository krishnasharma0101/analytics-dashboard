import { MessageSquare } from "lucide-react";
import PagePlaceholder from "@/components/PagePlaceholder";

export default function AIChatbotPage() {
  return (
    <PagePlaceholder
      title="AI Insights"
      description="Interact with our AI-powered assistant to uncover hidden patterns, generate reports, and get intelligent recommendations based on municipal data analysis."
      icon={MessageSquare}
    />
  );
}

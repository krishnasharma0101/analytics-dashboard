import { Users } from "lucide-react";
import PagePlaceholder from "@/components/PagePlaceholder";

export default function CitizensPage() {
  return (
    <PagePlaceholder
      title="Citizen Collection"
      description="Explore demographic data, census records, and citizen engagement metrics for the municipality. Manage and analyze population trends with actionable insights."
      icon={Users}
    />
  );
}

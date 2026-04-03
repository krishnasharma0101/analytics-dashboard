import { LayoutDashboard } from "lucide-react";
import PagePlaceholder from "@/components/PagePlaceholder";

export default function OverviewPage() {
  return (
    <PagePlaceholder
      title="Overview"
      description="Welcome to the Ayuntamiento Analytics Dashboard. View key metrics, trends, and real-time data across all municipal departments from this central hub."
      icon={LayoutDashboard}
    />
  );
}

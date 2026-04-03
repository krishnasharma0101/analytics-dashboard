import { UserCircle } from "lucide-react";
import PagePlaceholder from "@/components/PagePlaceholder";

export default function PeopleAnalyticsPage() {
  return (
    <PagePlaceholder
      title="People Analytics"
      description="Monitor workforce metrics, public service satisfaction, and community engagement scores. Gain insights into citizen behavior patterns and service utilization."
      icon={UserCircle}
    />
  );
}

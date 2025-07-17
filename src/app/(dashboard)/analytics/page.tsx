import { AnalyticsForm } from "@/components/analytics-form";
import { Lightbulb } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline inline-flex items-center gap-2">
          <Lightbulb className="h-8 w-8 text-accent" />
          Actionable Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Get plain-English advice on what&apos;s selling, who your best customers are, and how to grow your business.
        </p>
      </div>
      <AnalyticsForm />
    </div>
  );
}

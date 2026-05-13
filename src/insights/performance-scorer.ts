import type { AnalyticsSnapshot } from "../core/types.js";
import { summarizeAnalytics } from "./analytics-snapshot.js";

export function scorePerformance(snapshots: AnalyticsSnapshot[]): { score: number; recommendations: string[] } {
  const summary = summarizeAnalytics(snapshots);
  const score = Math.min(100, Math.round(summary.averageEngagementRate * 700 + summary.totalViews / 1000));
  const recommendations = [
    "Promote high-confidence read-only diagnostics into the default mission intake packet.",
    "Add an explicit approval template for every gated write action before the next run.",
    "Attach the replay trace and memory summary to future missions in the same domain."
  ];
  if (summary.averageEngagementRate < 0.06) {
    recommendations.unshift("Increase operator-visible telemetry before allowing autonomous progression.");
  }
  return { score, recommendations };
}

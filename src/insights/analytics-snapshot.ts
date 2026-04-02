import type { AnalyticsSnapshot } from "../core/types.js";

export function summarizeAnalytics(snapshots: AnalyticsSnapshot[]): { totalViews: number; averageEngagementRate: number } {
  const totalViews = snapshots.reduce((sum, snapshot) => sum + snapshot.views, 0);
  const averageEngagementRate =
    snapshots.length === 0
      ? 0
      : snapshots.reduce((sum, snapshot) => sum + snapshot.engagementRate, 0) / snapshots.length;
  return { totalViews, averageEngagementRate };
}

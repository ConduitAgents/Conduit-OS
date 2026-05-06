import { z } from "zod";

export const ToolActionSchema = z.object({
  id: z.string(),
  provider: z.string(),
  action: z.enum([
    "publishPost",
    "schedulePost",
    "fetchAnalytics",
    "fetchComments",
    "replyToComment",
    "routeTool",
    "requestApproval",
    "writeTrace",
    "commitMemory"
  ]),
  status: z.enum(["mocked_success", "mocked_pending", "mocked_failed"]),
  timestamp: z.string(),
  payload: z.record(z.unknown())
});

export const AnalyticsSnapshotSchema = z.object({
  id: z.string(),
  source: z.string(),
  impressions: z.number(),
  views: z.number(),
  likes: z.number(),
  comments: z.number(),
  shares: z.number(),
  saves: z.number(),
  clickThroughRate: z.number(),
  engagementRate: z.number(),
  capturedAt: z.string()
});

export type ToolAction = z.infer<typeof ToolActionSchema>;
export type AnalyticsSnapshot = z.infer<typeof AnalyticsSnapshotSchema>;

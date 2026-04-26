import { describe, expect, it } from "vitest";
import { RemotionRendererMock } from "../src/connectors/media/remotion-renderer.mock.js";
import { scorePerformance } from "../src/insights/performance-scorer.js";
import { ToolActionSchema } from "../src/contracts/operations.js";

describe("provider mocks", () => {
  it("returns structured tool action records", async () => {
    const action = ToolActionSchema.parse({
      id: "approval-test",
      provider: "ConduitOS Policy Gate",
      action: "requestApproval",
      status: "mocked_pending",
      timestamp: new Date().toISOString(),
      payload: { requestedActions: ["change production configuration"] }
    });
    expect(action.status).toBe("mocked_pending");
    expect(action.provider).toBe("ConduitOS Policy Gate");
  });

  it("returns structured render responses", async () => {
    const renderer = new RemotionRendererMock();
    const composition = await renderer.createComposition({ title: "test", scenes: ["a", "b"] });
    const render = await renderer.renderVideo(composition);
    expect(render.status).toBe("completed");
    expect(render.outputPath).toContain(".mp4");
  });

  it("returns optimization recommendations from analytics scores", () => {
    const result = scorePerformance([
      {
        id: "a",
        source: "Policy Gate",
        impressions: 10000,
        views: 8000,
        likes: 900,
        comments: 120,
        shares: 200,
        saves: 180,
        clickThroughRate: 0.03,
        engagementRate: 0.09,
        capturedAt: new Date().toISOString()
      }
    ]);
    expect(result.score).toBeGreaterThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});

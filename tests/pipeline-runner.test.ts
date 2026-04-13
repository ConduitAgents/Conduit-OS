import { describe, expect, it } from "vitest";
import { RuntimeCoordinator } from "../src/core/coordinator.js";
import { incidentResponsePipeline } from "../src/catalog/sample-pipelines.js";

describe("pipeline runner", () => {
  it("completes every stage in the incident response mission", async () => {
    const run = await new RuntimeCoordinator().run(incidentResponsePipeline);
    expect(run.status).toBe("completed");
    expect(run.stages).toHaveLength(10);
    expect(run.stages.every((stage) => stage.status === "completed")).toBe(true);
    expect(run.artifacts.length).toBeGreaterThan(0);
    expect(run.toolActions.length).toBeGreaterThan(0);
  });

  it("does not generate duplicate run ids", async () => {
    const coordinator = new RuntimeCoordinator();
    const first = await coordinator.run(incidentResponsePipeline);
    const second = await coordinator.run(incidentResponsePipeline);
    expect(first.id).not.toBe(second.id);
  });
});

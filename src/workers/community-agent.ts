import { artifact, type Agent, type AgentOutput } from "./base-agent.js";
import type { ExecutionContext } from "../core/execution-context.js";

export class CommunityAgent implements Agent {
  id = "trace-capture";
  name = "Trace Capture Agent";
  role = "Creates a replayable timeline of decisions, tool plans, and approval pauses";
  capabilities = ["trace_capture", "event_replay", "audit_packaging"];

  async run(context: ExecutionContext, input: any): Promise<AgentOutput> {
    const trace = {
      runId: context.runId,
      eventCount: context.events.length,
      stagesSeen: context.pipeline.stages.map((stage) => stage.id),
      approvals: input?.data?.approvalActions ?? []
    };
    return {
      summary: "Captured a replayable mission trace.",
      artifacts: [artifact("trace", "mission-trace.json", "data/artifacts/mission-trace.json", trace)],
      data: { ...input?.data, trace }
    };
  }
}

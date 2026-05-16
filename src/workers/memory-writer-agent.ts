import { artifact, type Agent, type AgentOutput } from "./base-agent.js";
import type { ExecutionContext } from "../core/execution-context.js";

export class MemoryWriterAgent implements Agent {
  id = "memory-writer";
  name = "Memory Writer Agent";
  role = "Summarizes mission results into reusable operational memory";
  capabilities = ["memory_write", "lesson_capture", "future_context"];

  async run(context: ExecutionContext, input: any): Promise<AgentOutput> {
    const memory = {
      missionId: context.pipeline.id,
      objective: context.pipeline.objective,
      durableFacts: [
        "Policy gates must pause risky write actions.",
        "Replayable traces should include routing, tool plans, and approvals.",
        "Future agents should receive mission domain, risk tier, and system scope before tool use."
      ],
      traceArtifact: input?.data?.trace
    };
    return {
      summary: "Prepared mission memory for future agent context.",
      artifacts: [artifact("memory", "mission-memory.json", "data/artifacts/mission-memory.json", memory)],
      data: { ...input?.data, missionMemory: memory }
    };
  }
}

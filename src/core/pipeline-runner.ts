import type { AgentOutput } from "../workers/base-agent.js";
import type { ExecutionContext } from "./execution-context.js";
import type { PipelineStage } from "./types.js";

export async function runStage(
  stage: PipelineStage,
  context: ExecutionContext,
  runAgent: (agentId: string, input: unknown) => Promise<AgentOutput>
): Promise<AgentOutput> {
  return runAgent(stage.assignedAgent, context.getPreviousOutput());
}

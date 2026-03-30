import { artifact, type Agent, type AgentOutput } from "./base-agent.js";
import type { ExecutionContext } from "../core/execution-context.js";

export class StrategyAgent implements Agent {
  id = "work-decomposition";
  name = "Work Decomposition Agent";
  role = "Breaks a mission into sequenced, assignable stages";
  capabilities = ["task_breakdown", "dependency_mapping", "stage_planning"];

  async run(context: ExecutionContext, input: any): Promise<AgentOutput> {
    const signal = input?.data?.primarySignal?.finding ?? context.pipeline.objective;
    const plan = {
      trigger: signal,
      stages: ["diagnose", "contain", "communicate", "verify", "record"],
      authority: context.pipeline.missionProfile.riskTier === "high" ? "human-approved writes only" : "bounded autonomous execution",
      successMetric: "mission closed with complete trace, approved actions, and reusable memory"
    };
    return {
      summary: "Decomposed the mission into controlled execution stages.",
      artifacts: [artifact("plan", "work-decomposition.json", "data/artifacts/work-decomposition.json", plan)],
      data: { ...input?.data, plan }
    };
  }
}

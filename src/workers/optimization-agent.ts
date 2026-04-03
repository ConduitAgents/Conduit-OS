import { artifact, type Agent, type AgentOutput } from "./base-agent.js";
import type { ExecutionContext } from "../core/execution-context.js";
import { scorePerformance } from "../insights/performance-scorer.js";

export class OptimizationAgent implements Agent {
  id = "optimization";
  name = "Optimization Agent";
  role = "Turns mission telemetry into next-run operating improvements";
  capabilities = ["memory_feedback", "recommendation_generation", "policy_tuning"];

  async run(_context: ExecutionContext, input: any): Promise<AgentOutput> {
    const result = scorePerformance(input?.data?.analytics ?? []);
    return {
      summary: "Generated next-run operating recommendations.",
      artifacts: [artifact("recommendation", "optimization-recommendations.json", "data/artifacts/optimization-recommendations.json", result)],
      recommendations: result.recommendations,
      data: { ...input?.data, optimization: result }
    };
  }
}

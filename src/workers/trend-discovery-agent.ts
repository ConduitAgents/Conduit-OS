import { artifact, type Agent, type AgentOutput } from "./base-agent.js";
import type { ExecutionContext } from "../core/execution-context.js";

export class TrendDiscoveryAgent implements Agent {
  id = "mission-intake";
  name = "Mission Intake Agent";
  role = "Normalizes incoming work into an inspectable mission record";
  capabilities = ["mission_intake", "context_capture", "risk_labeling"];

  async run(context: ExecutionContext): Promise<AgentOutput> {
    const profile = context.pipeline.missionProfile;
    const signals = [
      { source: "ticketing", finding: "customer-impacting service degradation", confidence: "high" },
      { source: "metrics", finding: "error rate above policy threshold", confidence: "medium" },
      { source: "runbook", finding: "approved read-only diagnostics available", confidence: "high" }
    ];
    return {
      summary: `Captured ${profile.domain} mission context with ${profile.riskTier} risk.`,
      artifacts: [artifact("mission", "mission-intake.json", "data/artifacts/mission-intake.json", { profile, signals })],
      data: { profile, signals, primarySignal: signals[0] }
    };
  }
}

import { artifact, type Agent, type AgentOutput } from "./base-agent.js";
import type { ExecutionContext } from "../core/execution-context.js";

export class ScriptwritingAgent implements Agent {
  id = "agent-router";
  name = "Agent Router";
  role = "Assigns specialist agents to the right parts of the mission";
  capabilities = ["agent_selection", "handoff_context", "capability_matching"];

  async run(_context: ExecutionContext, input: any): Promise<AgentOutput> {
    const route = {
      assignments: [
        { agent: "diagnostics-specialist", owns: "read-only evidence gathering", tools: ["metrics", "logs"] },
        { agent: "policy-specialist", owns: "authority and approval checks", tools: ["policy-registry"] },
        { agent: "operations-specialist", owns: "approved execution and closure", tools: ["ticketing", "runbook"] }
      ],
      handoffPacket: "mission objective, risk tier, systems, plan, and current evidence"
    };
    return {
      summary: "Routed mission work to specialist agent lanes.",
      artifacts: [artifact("routing", "agent-routing.json", "data/artifacts/agent-routing.json", route)],
      data: { ...input?.data, route }
    };
  }
}

import { artifact, type Agent, type AgentOutput } from "./base-agent.js";
import type { ExecutionContext } from "../core/execution-context.js";

export class EditingAgent implements Agent {
  id = "policy-gate";
  name = "Policy Gate Agent";
  role = "Evaluates authority, risk, and approval requirements before tool execution";
  capabilities = ["policy_evaluation", "authority_control", "approval_routing"];

  async run(_context: ExecutionContext, input: any): Promise<AgentOutput> {
    const policy = {
      allowed: ["read metrics", "read tickets", "draft operator update", "write trace"],
      requiresApproval: ["change production configuration", "notify customers", "close incident"],
      denied: ["delete data", "rotate secrets without approved break-glass procedure"],
      decision: "pause write actions for human approval"
    };
    return {
      summary: "Applied policy gates and isolated actions that require approval.",
      artifacts: [artifact("policy", "policy-gate.json", "data/artifacts/policy-gate.json", policy)],
      data: { ...input?.data, policy }
    };
  }
}

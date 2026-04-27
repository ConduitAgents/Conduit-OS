import { artifact, type Agent, type AgentOutput } from "./base-agent.js";
import type { ExecutionContext } from "../core/execution-context.js";
import { randomUUID } from "node:crypto";

export class PublishingAgent implements Agent {
  id = "approval-checkpoint";
  name = "Approval Checkpoint Agent";
  role = "Pauses risky actions and records explicit human approval requirements";
  capabilities = ["approval_queue", "risk_pause", "operator_handoff"];

  async run(context: ExecutionContext, input: any): Promise<AgentOutput> {
    const actions = [
      {
        id: `approval_${randomUUID()}`,
      provider: "ConduitOS Policy Gate",
        action: "requestApproval" as const,
        status: "mocked_pending" as const,
        timestamp: new Date().toISOString(),
        payload: {
          mission: context.pipeline.id,
          riskTier: context.pipeline.missionProfile.riskTier,
          requestedActions: input?.data?.policy?.requiresApproval ?? []
        }
      }
    ];
    return {
      summary: "Queued risky write actions for human approval.",
      artifacts: [artifact("approval", "approval-checkpoint.json", "data/artifacts/approval-checkpoint.json", { actions })],
      toolActions: actions,
      data: { ...input?.data, approvalActions: actions }
    };
  }
}

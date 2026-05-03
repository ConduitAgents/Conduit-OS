import type { PipelineDefinition } from "../core/types.js";
import { stage } from "./stages.js";

export const incidentResponsePipeline: PipelineDefinition = {
  id: "sample-incident-response",
  name: "Incident Response Mission",
  objective: "Triage a service degradation, route specialist agents, gate risky actions, and write a replayable trace to memory.",
  missionProfile: {
    owner: "ops-command",
    domain: "incident response",
    riskTier: "high",
    systems: ["status-page", "metrics", "ticketing", "runbook"]
  },
  stages: [
    stage("intake", "mission_intake", "Mission Intake", "mission-intake"),
    stage("decompose", "work_decomposition", "Work Decomposition", "work-decomposition"),
    stage("route", "agent_routing", "Agent Routing", "agent-router"),
    stage("policy", "policy_gate", "Policy Gate", "policy-gate"),
    stage("tools", "tool_orchestration", "Tool Orchestration", "tool-orchestration"),
    stage("approval", "approval_checkpoint", "Approval Checkpoint", "approval-checkpoint"),
    stage("trace", "trace_capture", "Trace Capture", "trace-capture"),
    stage("memory", "memory_write", "Memory Write", "memory-writer"),
    stage("outcome", "outcome_review", "Outcome Review", "outcome-review"),
    stage("optimize", "optimization_loop", "Optimization Loop", "optimization")
  ]
};

export const ticketOperationsPipeline: PipelineDefinition = {
  ...incidentResponsePipeline,
  id: "sample-ticket-operations",
  name: "Ticket Operations Mission",
  objective: "Classify a backlog ticket, route the work to specialist agents, enforce authority limits, and persist the resolution trace.",
  missionProfile: {
    owner: "back-office-command",
    domain: "ticket handling",
    riskTier: "medium",
    systems: ["helpdesk", "crm", "knowledge-base", "task-queue"]
  }
};

export function getSamplePipeline(name: string): PipelineDefinition {
  if (name === "incident") return incidentResponsePipeline;
  if (name === "ticket") return ticketOperationsPipeline;
  throw new Error(`Unknown sample mission "${name}". Expected "incident" or "ticket".`);
}

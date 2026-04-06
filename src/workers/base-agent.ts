import type { ExecutionContext } from "../core/execution-context.js";
import type { Artifact, ToolAction, AnalyticsSnapshot } from "../core/types.js";
import { randomUUID } from "node:crypto";

export type AgentOutput = {
  summary: string;
  artifacts?: Artifact[];
  toolActions?: ToolAction[];
  analytics?: AnalyticsSnapshot[];
  recommendations?: string[];
  data: Record<string, unknown>;
};

export interface Agent {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  run(context: ExecutionContext, input: unknown): Promise<AgentOutput>;
}

export function artifact(type: Artifact["type"], name: string, uri: string, metadata: Record<string, unknown> = {}): Artifact {
  return {
    id: `${type}_${randomUUID()}`,
    type,
    name,
    uri,
    metadata
  };
}

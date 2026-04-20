import { randomUUID } from "node:crypto";
import type { PipelineEvent } from "./types.js";

export function createEvent(runId: string, stageId: string | null, type: string, data: Record<string, unknown>): PipelineEvent {
  return {
    id: randomUUID(),
    runId,
    stageId,
    type,
    timestamp: new Date().toISOString(),
    data
  };
}

import type { PipelineStage, StageType } from "../core/types.js";

export function stage(id: string, type: StageType, name: string, assignedAgent: string): PipelineStage {
  return {
    id,
    type,
    name,
    assignedAgent,
    status: "pending",
    artifacts: [],
    inputSchemaName: `${type}.input`,
    outputSchemaName: `${type}.output`
  };
}

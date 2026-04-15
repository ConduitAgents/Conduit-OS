import { z } from "zod";
import { ArtifactSchema } from "./artifacts.js";
import { MemoryCommitSchema } from "./memory.js";
import { AnalyticsSnapshotSchema, ToolActionSchema } from "./operations.js";

export const StageTypeSchema = z.enum([
  "mission_intake",
  "work_decomposition",
  "agent_routing",
  "policy_gate",
  "tool_orchestration",
  "approval_checkpoint",
  "trace_capture",
  "memory_write",
  "outcome_review",
  "optimization_loop"
]);

export const PipelineStageSchema = z.object({
  id: z.string(),
  type: StageTypeSchema,
  name: z.string(),
  assignedAgent: z.string(),
  status: z.enum(["pending", "running", "completed", "failed"]).default("pending"),
  artifacts: z.array(ArtifactSchema).default([]),
  inputSchemaName: z.string(),
  outputSchemaName: z.string()
});

export const PipelineDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  objective: z.string(),
  missionProfile: z.object({
    owner: z.string(),
    domain: z.string(),
    riskTier: z.enum(["low", "medium", "high"]),
    systems: z.array(z.string())
  }),
  stages: z.array(PipelineStageSchema)
});

export const PipelineEventSchema = z.object({
  id: z.string(),
  runId: z.string(),
  stageId: z.string().nullable(),
  type: z.string(),
  timestamp: z.string(),
  data: z.record(z.unknown())
});

export const PipelineRunSchema = z.object({
  id: z.string(),
  pipelineId: z.string(),
  objective: z.string(),
  status: z.enum(["running", "completed", "failed"]),
  startedAt: z.string(),
  completedAt: z.string().nullable(),
  stages: z.array(PipelineStageSchema),
  artifacts: z.array(ArtifactSchema),
  toolActions: z.array(ToolActionSchema),
  analytics: z.array(AnalyticsSnapshotSchema),
  memoryCommits: z.array(MemoryCommitSchema),
  optimizationRecommendations: z.array(z.string()),
  events: z.array(PipelineEventSchema)
});

export type StageType = z.infer<typeof StageTypeSchema>;
export type PipelineStage = z.infer<typeof PipelineStageSchema>;
export type PipelineDefinition = z.infer<typeof PipelineDefinitionSchema>;
export type PipelineEvent = z.infer<typeof PipelineEventSchema>;
export type PipelineRun = z.infer<typeof PipelineRunSchema>;

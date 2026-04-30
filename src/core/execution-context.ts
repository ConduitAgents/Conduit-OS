import type { AnalyticsSnapshot, Artifact, MemoryCommit, PipelineDefinition, PipelineEvent, ToolAction } from "./types.js";

export class ExecutionContext {
  readonly artifacts: Artifact[] = [];
  readonly toolActions: ToolAction[] = [];
  readonly analytics: AnalyticsSnapshot[] = [];
  readonly memoryCommits: MemoryCommit[] = [];
  readonly recommendations: string[] = [];
  readonly events: PipelineEvent[] = [];
  private readonly stageOutputs = new Map<string, unknown>();

  constructor(
    readonly runId: string,
    readonly pipeline: PipelineDefinition,
    readonly startedAt = new Date().toISOString()
  ) {}

  addEvent(event: PipelineEvent): void {
    this.events.push(event);
  }

  setStageOutput(stageId: string, output: unknown): void {
    this.stageOutputs.set(stageId, output);
  }

  getPreviousOutput(): unknown {
    const values = [...this.stageOutputs.values()];
    return values.at(-1);
  }
}

import pino from "pino";
import { randomUUID } from "node:crypto";
import { defaultAgentRegistry } from "../catalog/stage-registry.js";
import { PipelineDefinitionSchema } from "../contracts/pipeline.js";
import { ConduitMemoryStore } from "../records/conduit-memory-store.js";
import { JsonStore } from "../records/json-store.js";
import { storagePaths } from "../records/paths.js";
import { ExecutionContext } from "./execution-context.js";
import { createEvent } from "./events.js";
import { runStage } from "./pipeline-runner.js";
import type { PipelineDefinition, PipelineRun } from "./types.js";

export class RuntimeCoordinator {
  private readonly logger = pino({ level: process.env.CONDUITOS_LOG_LEVEL ?? "warn" });
  private readonly agents = defaultAgentRegistry();
  private readonly runs = new JsonStore<PipelineRun>(storagePaths.runs);
  private readonly artifactStore = new JsonStore<{ id: string; artifact: unknown }>(storagePaths.artifacts);
  private readonly toolActionStore = new JsonStore<{ id: string; action: unknown }>(storagePaths.toolActions);

  constructor(private readonly memory = new ConduitMemoryStore()) {}

  async run(pipelineDefinition: PipelineDefinition): Promise<PipelineRun> {
    const pipeline = PipelineDefinitionSchema.parse({
      ...pipelineDefinition,
      stages: pipelineDefinition.stages.map((stage) => ({ ...stage, status: "pending", artifacts: [] }))
    });
    const context = new ExecutionContext(`run_${randomUUID()}`, pipeline);
    context.addEvent(createEvent(context.runId, null, "run.started", { objective: pipeline.objective }));

    for (const stage of pipeline.stages) {
      stage.status = "running";
      context.addEvent(createEvent(context.runId, stage.id, "stage.started", { type: stage.type, agent: stage.assignedAgent }));
      this.logger.info({ runId: context.runId, stageId: stage.id }, "stage started");

      try {
        const output = await runStage(stage, context, async (agentId, input) => {
          const agent = this.agents.get(agentId);
          if (!agent) throw new Error(`No agent registered for "${agentId}"`);
          return agent.run(context, input);
        });
        stage.status = "completed";
        stage.artifacts = output.artifacts ?? [];
        context.artifacts.push(...(output.artifacts ?? []));
        context.toolActions.push(...(output.toolActions ?? []));
        context.analytics.push(...(output.analytics ?? []));
        context.recommendations.push(...(output.recommendations ?? []));
        context.setStageOutput(stage.id, output);

        const commit = await this.memory.commit({
          repo: `conduitos/${pipeline.id}`,
          authorAgentId: `did:conduitos:agent:${stage.assignedAgent}`,
          message: `${stage.name}: ${output.summary}`,
          filesChanged: [
            `execution-history/${context.runId}/${stage.id}.json`,
            ...stage.artifacts.map((item) => item.uri)
          ],
          metadata: { runId: context.runId, stageId: stage.id, stageType: stage.type, summary: output.summary }
        });
        context.memoryCommits.push(commit);
        context.addEvent(createEvent(context.runId, stage.id, "stage.completed", { summary: output.summary, commitId: commit.id }));
      } catch (error) {
        stage.status = "failed";
        context.addEvent(createEvent(context.runId, stage.id, "stage.failed", { message: (error as Error).message }));
        throw error;
      }
    }

    const run: PipelineRun = {
      id: context.runId,
      pipelineId: pipeline.id,
      objective: pipeline.objective,
      status: "completed",
      startedAt: context.startedAt,
      completedAt: new Date().toISOString(),
      stages: pipeline.stages,
      artifacts: context.artifacts,
      toolActions: context.toolActions,
      analytics: context.analytics,
      memoryCommits: context.memoryCommits,
      optimizationRecommendations: context.recommendations,
      events: context.events
    };
    context.addEvent(createEvent(context.runId, null, "run.completed", { stageCount: run.stages.length }));
    run.events = context.events;
    await this.runs.write(run);
    await Promise.all(run.artifacts.map((artifact) => this.artifactStore.write({ id: artifact.id, artifact })));
    await Promise.all(run.toolActions.map((action) => this.toolActionStore.write({ id: action.id, action })));
    return run;
  }

  async inspect(runId: string): Promise<PipelineRun | null> {
    return this.runs.read(runId);
  }

  async listMemory() {
    return this.memory.listCommits();
  }

  async clean(): Promise<void> {
    await this.runs.clean();
    await this.artifactStore.clean();
    await this.toolActionStore.clean();
    await this.memory.clean();
  }
}

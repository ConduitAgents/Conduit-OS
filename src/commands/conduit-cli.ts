import { Command } from "commander";
import { RuntimeCoordinator } from "../core/coordinator.js";
import { getSamplePipeline } from "../catalog/sample-pipelines.js";

const program = new Command();
const coordinator = new RuntimeCoordinator();

program.name("conduitos").description("ConduitOS local autonomous operations runner").version("0.1.0");

program
  .command("run")
  .argument("<sample>", "sample mission to run: incident or ticket")
  .description("Run a local ConduitOS mission pipeline")
  .action(async (sample: string) => {
    const run = await coordinator.run(getSamplePipeline(sample));
    const summary = {
      runId: run.id,
      status: run.status,
      stagesCompleted: run.stages.filter((stage) => stage.status === "completed").length,
      artifactsCreated: run.artifacts.length,
      toolActionsMocked: run.toolActions.length,
      telemetrySnapshots: run.analytics.length,
      memoryCommits: run.memoryCommits.length,
      optimizationRecommendations: run.optimizationRecommendations
    };
    console.log(JSON.stringify(summary, null, 2));
  });

program
  .command("inspect")
  .argument("<runId>", "pipeline run id")
  .description("Print a stored pipeline run as structured JSON")
  .action(async (runId: string) => {
    const run = await coordinator.inspect(runId);
    if (!run) {
      console.error(`No run found for ${runId}`);
      process.exitCode = 1;
      return;
    }
    console.log(JSON.stringify(run, null, 2));
  });

program
  .command("memory")
  .description("List local ConduitOS memory commits")
  .action(async () => {
    const commits = await coordinator.listMemory();
    console.log(JSON.stringify(commits, null, 2));
  });

program
  .command("clean")
  .description("Remove local JSON run, memory, artifact, and provider-action records")
  .action(async () => {
    await coordinator.clean();
    console.log(JSON.stringify({ status: "cleaned", directories: ["data/runs", "data/memory", "data/artifacts", "data/tool-actions"] }, null, 2));
  });

await program.parseAsync();

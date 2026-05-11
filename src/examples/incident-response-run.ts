import { RuntimeCoordinator } from "../core/coordinator.js";
import { incidentResponsePipeline } from "../catalog/sample-pipelines.js";

const run = await new RuntimeCoordinator().run(incidentResponsePipeline);
console.log(JSON.stringify(run, null, 2));

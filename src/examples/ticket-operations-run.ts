import { RuntimeCoordinator } from "../core/coordinator.js";
import { ticketOperationsPipeline } from "../catalog/sample-pipelines.js";

const run = await new RuntimeCoordinator().run(ticketOperationsPipeline);
console.log(JSON.stringify(run, null, 2));

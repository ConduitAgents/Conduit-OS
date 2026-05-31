# ConduitOS

```4LjHBwPfA2EE4Ayw4wtBYDT11U4iQastfRgRUQHypump```

ConduitOS is an operating layer for autonomous agents. It routes missions through specialist agents, controls tool authority, pauses risky actions for approval, records replayable traces, and writes outcomes into memory so future runs have better context.

Think of ConduitOS as mission control for agent fleets: work enters the system, gets decomposed into stages, moves through policy gates, and leaves behind an inspectable operational record.

```bash
npm install
npm run conduit -- run incident
```

## What It Does

ConduitOS runs inspectable autonomous operations from the terminal:

- accepts a mission objective
- breaks the mission into controlled stages
- routes work to specialist agents
- gates tool access through policy decisions
- queues risky write actions for human approval
- captures a replayable trace of what happened
- writes local memory commits for completed stages
- stores run history as JSON under `data/`

The project is intentionally local-first. The bundled connectors and providers are deterministic mocks, so the runtime can be tested without production credentials, third-party API access, or live infrastructure.

## Current Samples

Run an incident-response mission:

```bash
npm run conduit -- run incident
```

Run a back-office ticket mission:

```bash
npm run conduit -- run ticket
```

Inspect a saved run:

```bash
npm run conduit -- inspect <runId>
```

List local memory commits:

```bash
npm run conduit -- memory
```

Clean generated JSON records:

```bash
npm run conduit -- clean
```

## Mission Stages

The sample missions model a controlled autonomous operations loop:

```text
mission_intake
  -> work_decomposition
  -> agent_routing
  -> policy_gate
  -> tool_orchestration
  -> approval_checkpoint
  -> trace_capture
  -> memory_write
  -> outcome_review
  -> optimization_loop
```

Each stage has a typed definition, assigned agent, status, generated artifacts, and events written into the final run record.

## Agent Fleet

ConduitOS includes local agents for:

- mission intake
- work decomposition
- specialist routing
- policy gates
- tool orchestration
- human approval checkpoints
- trace capture
- memory writing
- outcome review
- optimization

Agents implement the shared runtime contract:

```ts
{
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  run(context, input): Promise<AgentResult>;
}
```

## Project Layout

```text
src/
  commands/       CLI entry points
  core/           coordinator, execution context, events, run types
  catalog/        sample missions and stage registry
  workers/        autonomous operations agents
  connectors/     mocked provider integrations
  records/        JSON stores, paths, local ConduitOS memory
  contracts/      zod schemas and shared contract types
  insights/       telemetry summaries and scoring
  examples/       direct TypeScript run examples
tests/            Vitest coverage
data/             generated local runtime records
```

## Local Records

Generated runtime data is stored here:

```text
data/
  runs/              mission run JSON
  memory/            ConduitOS memory commit JSON
  artifacts/         artifact metadata JSON
  tool-actions/      mocked tool/action JSON
```

The storage root defaults to `data/`. Override it with:

```bash
CONDUITOS_DATA_DIR=./tmp/conduitos-data npm run conduit -- run incident
```

## Development

Requirements:

- Node.js 20 or newer
- npm

Useful commands:

```bash
npm install
npm run lint
npm test
npm run conduit -- run incident
```

Vitest covers:

- full mission completion
- unique run IDs
- local memory parent links
- mocked provider response contracts
- telemetry scoring recommendations

## Notes

ConduitOS does not handle secrets and does not call real third-party services. Production connectors should add encrypted secret storage, audit logging, retry policy, provider-specific permissions, policy enforcement, approval workflows, and data retention controls.

No license has been selected yet.

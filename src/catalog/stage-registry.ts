import type { Agent } from "../workers/base-agent.js";
import { AnalyticsAgent } from "../workers/analytics-agent.js";
import { CommunityAgent } from "../workers/community-agent.js";
import { EditingAgent } from "../workers/editing-agent.js";
import { OptimizationAgent } from "../workers/optimization-agent.js";
import { PublishingAgent } from "../workers/publishing-agent.js";
import { ScriptwritingAgent } from "../workers/scriptwriting-agent.js";
import { StrategyAgent } from "../workers/strategy-agent.js";
import { TrendDiscoveryAgent } from "../workers/trend-discovery-agent.js";
import { VideoGenerationAgent } from "../workers/video-generation-agent.js";
import { MemoryWriterAgent } from "../workers/memory-writer-agent.js";

export function defaultAgentRegistry(): Map<string, Agent> {
  const agents: Agent[] = [
    new TrendDiscoveryAgent(),
    new StrategyAgent(),
    new ScriptwritingAgent(),
    new VideoGenerationAgent(),
    new EditingAgent(),
    new PublishingAgent(),
    new CommunityAgent(),
    new MemoryWriterAgent(),
    new AnalyticsAgent(),
    new OptimizationAgent()
  ];
  return new Map(agents.map((agent) => [agent.id, agent]));
}

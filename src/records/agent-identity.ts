import type { AgentIdentity } from "../contracts/agent.js";

export function createAgentIdentity(id: string, name: string, role: string, capabilities: string[]): AgentIdentity {
  return {
    id,
    did: `did:conduitos:agent:${id}`,
    name,
    role,
    capabilities
  };
}

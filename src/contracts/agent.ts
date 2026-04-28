import { z } from "zod";

export const AgentIdentitySchema = z.object({
  id: z.string(),
  did: z.string().startsWith("did:conduitos:agent:"),
  name: z.string(),
  role: z.string(),
  capabilities: z.array(z.string())
});

export type AgentIdentity = z.infer<typeof AgentIdentitySchema>;

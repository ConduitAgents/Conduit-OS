import { z } from "zod";

export const ArtifactSchema = z.object({
  id: z.string(),
  type: z.enum([
    "mission",
    "plan",
    "routing",
    "policy",
    "tool-plan",
    "approval",
    "trace",
    "memory",
    "telemetry",
    "recommendation",
    "research",
    "strategy",
    "script",
    "image",
    "video",
    "edit",
    "render",
    "post",
    "analytics"
  ]),
  name: z.string(),
  uri: z.string(),
  metadata: z.record(z.unknown()).default({})
});

export type Artifact = z.infer<typeof ArtifactSchema>;

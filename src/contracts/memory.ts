import { z } from "zod";

export const MemoryCommitSchema = z.object({
  id: z.string(),
  repo: z.string(),
  authorAgentId: z.string(),
  message: z.string(),
  timestamp: z.string(),
  parentCommitId: z.string().nullable(),
  filesChanged: z.array(z.string()),
  metadata: z.record(z.unknown())
});

export type MemoryCommit = z.infer<typeof MemoryCommitSchema>;

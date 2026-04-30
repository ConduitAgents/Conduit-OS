import { randomUUID } from "node:crypto";
import { CommitStore } from "./commit-store.js";
import type { MemoryCommit } from "../core/types.js";

export class ConduitMemoryStore {
  private lastCommitId: string | null = null;

  constructor(private readonly store = new CommitStore()) {}

  async commit(input: {
    repo: string;
    authorAgentId: string;
    message: string;
    filesChanged: string[];
    metadata: Record<string, unknown>;
  }): Promise<MemoryCommit> {
    const commit: MemoryCommit = {
      id: `conduit-trace-${randomUUID()}`,
      repo: input.repo,
      authorAgentId: input.authorAgentId,
      message: input.message,
      timestamp: new Date().toISOString(),
      parentCommitId: this.lastCommitId,
      filesChanged: input.filesChanged,
      metadata: {
        ...input.metadata,
        integration: "conduitos-local-memory",
        note: "This is a local ConduitOS memory record, not an external memory service."
      }
    };
    this.lastCommitId = commit.id;
    await this.store.write(commit);
    return commit;
  }

  async listCommits(): Promise<MemoryCommit[]> {
    return this.store.list();
  }

  async clean(): Promise<void> {
    this.lastCommitId = null;
    await this.store.clean();
  }
}

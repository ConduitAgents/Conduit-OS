import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CommitStore } from "../src/records/commit-store.js";
import { ConduitMemoryStore } from "../src/records/conduit-memory-store.js";

describe("ConduitOS memory store", () => {
  it("writes versioned local ledger commits", async () => {
    const directory = await mkdtemp(path.join(tmpdir(), "conduitos-memory-"));
    const memory = new ConduitMemoryStore(new CommitStore(directory));
    const first = await memory.commit({
      repo: "conduitos/test",
      authorAgentId: "did:conduitos:agent:test",
      message: "first",
      filesChanged: ["strategy.md"],
      metadata: {}
    });
    const second = await memory.commit({
      repo: "conduitos/test",
      authorAgentId: "did:conduitos:agent:test",
      message: "second",
      filesChanged: ["history.json"],
      metadata: {}
    });
    expect(second.parentCommitId).toBe(first.id);
    expect(await memory.listCommits()).toHaveLength(2);
  });
});

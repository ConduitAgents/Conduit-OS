import { JsonStore } from "../records/json-store.js";
import { storagePaths } from "../records/paths.js";
import type { MemoryCommit } from "../core/types.js";

export class CommitStore extends JsonStore<MemoryCommit> {
  constructor(directory = storagePaths.memory) {
    super(directory);
  }
}

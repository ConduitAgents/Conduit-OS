import path from "node:path";

export const dataRoot = process.env.CONDUITOS_DATA_DIR
  ? path.resolve(process.env.CONDUITOS_DATA_DIR)
  : path.resolve(process.cwd(), "data");

export const storagePaths = {
  runs: path.join(dataRoot, "runs"),
  memory: path.join(dataRoot, "memory"),
  artifacts: path.join(dataRoot, "artifacts"),
  toolActions: path.join(dataRoot, "tool-actions")
};

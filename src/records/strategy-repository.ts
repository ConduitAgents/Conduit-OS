export type StrategyFile = {
  path: string;
  content: Record<string, unknown>;
};

export function strategyFilesForStage(stageId: string, output: unknown): StrategyFile[] {
  return [
    {
      path: `execution-history/${stageId}.json`,
      content: { stageId, output }
    }
  ];
}

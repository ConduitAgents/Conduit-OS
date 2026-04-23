import { randomUUID } from "node:crypto";

export type Composition = {
  id: string;
  title: string;
  durationSeconds: number;
  resolution: "1080x1920" | "1920x1080";
  scenes: string[];
};

export type RenderResult = {
  id: string;
  compositionId: string;
  durationSeconds: number;
  resolution: string;
  outputPath: string;
  status: "queued" | "rendering" | "completed";
};

export class RemotionRendererMock {
  async createComposition(input: { title: string; scenes: string[]; format?: "short_vertical" | "landscape" }): Promise<Composition> {
    return {
      id: `composition_${randomUUID()}`,
      title: input.title,
      durationSeconds: Math.max(24, input.scenes.length * 6),
      resolution: input.format === "landscape" ? "1920x1080" : "1080x1920",
      scenes: input.scenes
    };
  }

  async renderVideo(composition: Composition): Promise<RenderResult> {
    return {
      id: `render_${randomUUID()}`,
      compositionId: composition.id,
      durationSeconds: composition.durationSeconds,
      resolution: composition.resolution,
      outputPath: `data/artifacts/${composition.id}.mp4`,
      status: "completed"
    };
  }

  async getRenderStatus(renderId: string): Promise<{ renderId: string; status: "completed"; progress: number }> {
    return { renderId, status: "completed", progress: 1 };
  }
}

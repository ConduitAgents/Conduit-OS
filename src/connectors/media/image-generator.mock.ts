import { randomUUID } from "node:crypto";

export class ImageGeneratorMock {
  async generateStoryboard(prompt: string): Promise<{ id: string; images: string[]; prompt: string }> {
    return {
      id: `storyboard_${randomUUID()}`,
      prompt,
      images: ["hook-frame.png", "mechanic-breakdown.png", "final-callout.png"].map((file) => `data/artifacts/${file}`)
    };
  }
}

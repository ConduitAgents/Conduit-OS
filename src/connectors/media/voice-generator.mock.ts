import { randomUUID } from "node:crypto";

export class VoiceGeneratorMock {
  async synthesize(text: string): Promise<{ id: string; voice: string; outputPath: string; durationSeconds: number }> {
    return {
      id: `voice_${randomUUID()}`,
      voice: "mock-clear-narrator",
      outputPath: "data/artifacts/voiceover.wav",
      durationSeconds: Math.ceil(text.length / 14)
    };
  }
}

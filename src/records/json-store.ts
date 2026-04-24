import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export class JsonStore<T extends { id: string }> {
  constructor(private readonly directory: string) {}

  async ensure(): Promise<void> {
    await mkdir(this.directory, { recursive: true });
  }

  async write(record: T): Promise<T> {
    await this.ensure();
    await writeFile(this.pathFor(record.id), JSON.stringify(record, null, 2), "utf8");
    return record;
  }

  async read(id: string): Promise<T | null> {
    await this.ensure();
    try {
      const raw = await readFile(this.pathFor(id), "utf8");
      return JSON.parse(raw) as T;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
  }

  async list(): Promise<T[]> {
    await this.ensure();
    const files = (await readdir(this.directory)).filter((file) => file.endsWith(".json"));
    const records = await Promise.all(files.map((file) => readFile(path.join(this.directory, file), "utf8")));
    return records.map((record) => JSON.parse(record) as T);
  }

  async clean(): Promise<void> {
    await mkdir(this.directory, { recursive: true });
    const files = (await readdir(this.directory)).filter((file) => file.endsWith(".json"));
    await Promise.all(files.map((file) => rm(path.join(this.directory, file), { force: true })));
  }

  private pathFor(id: string): string {
    return path.join(this.directory, `${id}.json`);
  }
}

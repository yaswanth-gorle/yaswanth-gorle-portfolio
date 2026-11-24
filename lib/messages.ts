import { promises as fs } from "fs";
import os from "os";
import path from "path";

export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

type NewMessage = Omit<Message, "id" | "createdAt">;

/** Tries MESSAGES_FILE, then ./data, then the OS temp dir (read-only hosts like Vercel). */
function candidatePaths(): string[] {
  return [
    process.env.MESSAGES_FILE,
    path.join(process.cwd(), "data", "messages.json"),
    path.join(os.tmpdir(), "portfolio-messages.json"),
  ].filter((p): p is string => Boolean(p));
}

async function readFrom(file: string): Promise<Message[]> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as Message[];
  } catch {
    return [];
  }
}

let queue: Promise<unknown> = Promise.resolve();

export function saveMessage(input: NewMessage): Promise<Message> {
  const run = async (): Promise<Message> => {
    for (const file of candidatePaths()) {
      try {
        await fs.mkdir(path.dirname(file), { recursive: true });
        const all = await readFrom(file);
        const msg: Message = {
          id: (all[all.length - 1]?.id ?? 0) + 1,
          ...input,
          createdAt: new Date().toISOString(),
        };
        all.push(msg);
        await fs.writeFile(file, JSON.stringify(all, null, 2));
        return msg;
      } catch {
        continue;
      }
    }
    throw new Error("Could not store message");
  };
  const result = queue.then(run, run);
  queue = result.catch(() => undefined);
  return result;
}

export async function listMessages(): Promise<Message[]> {
  for (const file of candidatePaths()) {
    const all = await readFrom(file);
    if (all.length) return all.reverse();
  }
  return [];
}

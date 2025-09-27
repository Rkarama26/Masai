import fs from "fs/promises";
import path from "path";

const LOG_PATH = path.resolve("transactions.log");

export async function logTransaction(text) {
  try {
    const now = new Date().toISOString().replace("T", " ").split(".")[0];
    const line = `[${now}] ${text}\n`;
    await fs.appendFile(LOG_PATH, line, "utf-8");
  } catch (err) {
    console.error("Failed to write transaction log:", err);
  }
}

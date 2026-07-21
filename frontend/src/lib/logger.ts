type LogLevel = "debug" | "info" | "warn" | "error";

class Logger {
  private level: LogLevel = "info";

  constructor() {
    if (process.env.NODE_ENV === "development") {
      this.level = "debug";
    }
  }

  debug(message: string, ...args: unknown[]) {
    if (this.level === "debug") {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: unknown[]) {
    if (this.level === "debug" || this.level === "info") {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: unknown[]) {
    if (this.level !== "error") {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: unknown[]) {
    console.error(`[ERROR] ${message}`, ...args);
  }
}

export const logger = new Logger();

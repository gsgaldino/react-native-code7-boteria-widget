import type { Logger } from '../interfaces/Logger';

export class ConsoleLoggerAdapter implements Logger {
  constructor(private readonly isDev: boolean) {}

  log(...str: string[]): void {
    if (this.isDev) console.log(...str);
  }
}

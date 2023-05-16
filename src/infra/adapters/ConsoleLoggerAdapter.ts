import { Logger } from '../ports/Logger';

export class ConsoleLoggerAdapter implements Logger {
  log(...str: string[]): void {
    console.log(...str);
  }
}

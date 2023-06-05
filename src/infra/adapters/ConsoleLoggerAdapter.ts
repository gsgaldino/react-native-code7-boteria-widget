import type { Logger } from '../ports/Logger';

export class ConsoleLoggerAdapter implements Logger {
  log(): void {
    // if (__DEV__ && false) console.log(...str);
  }
}

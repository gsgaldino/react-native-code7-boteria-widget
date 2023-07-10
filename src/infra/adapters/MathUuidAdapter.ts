import type { Uuid } from '../interfaces';

export class MathUuidAdapter implements Uuid {
  generate(): string {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 15);
    return timestamp + randomString;
  }
}

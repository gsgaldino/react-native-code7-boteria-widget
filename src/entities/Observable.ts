import type { Observer } from './Observer';

export class Observable {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  register(observer: Observer) {
    this.observers.push(observer);
  }

  notify(event: string, data: any) {
    for (const observer of this.observers) {
      if (observer.event === event) observer.callback(data);
    }
  }
}

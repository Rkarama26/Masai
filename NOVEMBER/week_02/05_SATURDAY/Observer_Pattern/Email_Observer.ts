import type { IObserver } from "./Types";

export class EmailObserver implements IObserver {
  unigqueID: string;
  constructor(id: string) {
    this.unigqueID = id;
  }

  update(subject: any): void {
    console.log(
      `Email Observer ${this.unigqueID}: Notified by subject: ${subject.message}`
    );
  }
}

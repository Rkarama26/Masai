import type { IObserver, ISubject } from "./Types";

export class MobileObserver implements IObserver {
  mobileID: number;
  constructor(id: number) {
    this.mobileID = id;
  }

  update(subject: ISubject): void {
    console.log(
      `Mobile Observer ${this.mobileID}: Notified by subject: ${
        (subject as any).message
      }`
    );
  }
}

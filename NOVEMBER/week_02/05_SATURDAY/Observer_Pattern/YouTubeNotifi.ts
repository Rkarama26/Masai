import type { IObserver, ISubject } from "./Types";

export class YouTubeNotification implements ISubject {
  // list of observers
  observerList: IObserver[] = [];
  message: string = "";

  subscribe(o: IObserver): void {
    //check if observer already exists
    const isExist = this.observerList.includes(o);
    if (isExist) {
      return console.log("Observer has been already subscribed.");
    }
    //push observer to list
    this.observerList.push(o);
  }

  unsubscribe(o: IObserver): void {
    const observerIndex = this.observerList.indexOf(o);
    if (observerIndex === -1) {
      return console.log("Observer not found.");
    }
    this.observerList.splice(observerIndex, 1);
  }

  // Notify all observers about an event
  notify(o: IObserver): void {
    for (const observer of this.observerList) {
      observer.update(this);
    }
  }

  notifyAll(): void {
    for (const observer of this.observerList) {
      observer.update(this);
    }
  }

  uploadVideo(message: string): void {
    this.message = message;
    this.notifyAll();
  }
}

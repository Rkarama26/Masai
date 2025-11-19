

export interface ISubject {
  subscribe(o: IObserver): void;
  unsubscribe(o: IObserver): void;
  notify(o: IObserver): void;
}

export interface IObserver {
  update(subject: ISubject): void;
}

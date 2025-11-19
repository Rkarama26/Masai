import type { IObserver, ISubject } from "./Types";
export declare class YouTubeNotification implements ISubject {
    observerList: IObserver[];
    message: string;
    subscribe(o: IObserver): void;
    unsubscribe(o: IObserver): void;
    notify(o: IObserver): void;
    notifyAll(): void;
    uploadVideo(message: string): void;
}
//# sourceMappingURL=YouTubeNotifi.d.ts.map
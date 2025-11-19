"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YouTubeNotification = void 0;
class YouTubeNotification {
    constructor() {
        // list of observers
        this.observerList = [];
        this.message = "";
    }
    subscribe(o) {
        //check if observer already exists
        const isExist = this.observerList.includes(o);
        if (isExist) {
            return console.log("Observer has been already subscribed.");
        }
        //push observer to list
        this.observerList.push(o);
    }
    unsubscribe(o) {
        const observerIndex = this.observerList.indexOf(o);
        if (observerIndex === -1) {
            return console.log("Observer not found.");
        }
        this.observerList.splice(observerIndex, 1);
    }
    // Notify all observers about an event
    notify(o) {
        for (const observer of this.observerList) {
            observer.update(this);
        }
    }
    notifyAll() {
        for (const observer of this.observerList) {
            observer.update(this);
        }
    }
    uploadVideo(message) {
        this.message = message;
        this.notifyAll();
    }
}
exports.YouTubeNotification = YouTubeNotification;
//# sourceMappingURL=YouTubeNotifi.js.map
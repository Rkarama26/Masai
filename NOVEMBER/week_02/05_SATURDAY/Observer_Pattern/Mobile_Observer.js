"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileObserver = void 0;
class MobileObserver {
    constructor(id) {
        this.mobileID = id;
    }
    update(subject) {
        console.log(`Mobile Observer ${this.mobileID}: Notified by subject: ${subject.message}`);
    }
}
exports.MobileObserver = MobileObserver;
//# sourceMappingURL=Mobile_Observer.js.map
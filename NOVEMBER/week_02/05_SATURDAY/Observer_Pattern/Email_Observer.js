"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailObserver = void 0;
class EmailObserver {
    constructor(id) {
        this.unigqueID = id;
    }
    update(subject) {
        console.log(`Email Observer ${this.unigqueID}: Notified by subject: ${subject.message}`);
    }
}
exports.EmailObserver = EmailObserver;
//# sourceMappingURL=Email_Observer.js.map
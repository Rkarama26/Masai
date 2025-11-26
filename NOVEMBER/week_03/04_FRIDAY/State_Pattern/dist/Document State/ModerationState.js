"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationState = void 0;
const PublishedState_1 = require("./PublishedState");
class ModerationState {
    publish(document, user) {
        if (user.role === "scriptwriter") {
            console.log(`${document.name} script cannot be published by ${user.role}`);
        }
        else if (user.role === "actor") {
            console.log(`${document.name} script cannot be published by ${user.role}`);
        }
        else if (user.role === "producer") {
            console.log(`${document.name} script is published by ${user.role}`);
            document.setState(new PublishedState_1.PublishedState());
        }
        else {
            throw new Error("Invalid user role!!!");
        }
    }
}
exports.ModerationState = ModerationState;
//# sourceMappingURL=ModerationState.js.map
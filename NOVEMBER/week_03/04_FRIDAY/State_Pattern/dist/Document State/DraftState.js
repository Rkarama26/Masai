"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftState = void 0;
const ModerationState_1 = require("./ModerationState");
class DraftState {
    publish(document, user) {
        console.log(`${document.name} script is sent for moderation by ${user.role}`);
        document.setState(new ModerationState_1.ModerationState());
    }
}
exports.DraftState = DraftState;
//# sourceMappingURL=DraftState.js.map
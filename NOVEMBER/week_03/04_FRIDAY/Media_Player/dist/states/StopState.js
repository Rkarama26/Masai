"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopState = void 0;
const PlayState_1 = require("./PlayState");
class StopState {
    play(player) {
        console.log("Starting playback from the beginning.");
        player.setState(new PlayState_1.PlayState());
    }
    pause(player) {
        console.log("Cannot pause while stopped.");
    }
    stop(player) {
        console.log("Already stopped.");
    }
}
exports.StopState = StopState;
//# sourceMappingURL=StopState.js.map
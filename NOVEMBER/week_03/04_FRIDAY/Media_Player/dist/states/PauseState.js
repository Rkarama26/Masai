"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PauseState = void 0;
const PlayState_1 = require("./PlayState");
const StopState_1 = require("./StopState");
class PauseState {
    play(player) {
        console.log("Resuming playback.");
        player.setState(new PlayState_1.PlayState());
    }
    pause(player) {
        console.log("Already paused.");
    }
    stop(player) {
        console.log("Stopping from pause.");
        player.setState(new StopState_1.StopState());
    }
}
exports.PauseState = PauseState;
//# sourceMappingURL=PauseState.js.map
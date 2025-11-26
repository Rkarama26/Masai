"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayState = void 0;
const PauseState_1 = require("./PauseState");
const StopState_1 = require("./StopState");
class PlayState {
    play(player) {
        console.log("Already playing.");
    }
    pause(player) {
        console.log("Pausing playback.");
        player.setState(new PauseState_1.PauseState());
    }
    stop(player) {
        console.log("Stopping playback.");
        player.setState(new StopState_1.StopState());
    }
}
exports.PlayState = PlayState;
//# sourceMappingURL=PlayState.js.map
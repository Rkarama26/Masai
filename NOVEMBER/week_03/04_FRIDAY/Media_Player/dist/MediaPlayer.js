"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaPlayer = void 0;
const StopState_1 = require("./states/StopState");
class MediaPlayer {
    constructor() {
        this.state = new StopState_1.StopState(); // Start in Stop state
    }
    play() {
        this.state.play(this);
    }
    pause() {
        this.state.pause(this);
    }
    stop() {
        this.state.stop(this);
    }
    setState(state) {
        this.state = state;
    }
}
exports.MediaPlayer = MediaPlayer;
//# sourceMappingURL=MediaPlayer.js.map
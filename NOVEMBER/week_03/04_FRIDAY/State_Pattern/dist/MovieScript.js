"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieScript = void 0;
const DraftState_1 = require("./Document State/DraftState");
class MovieScript {
    constructor(name, state) {
        this.name = name;
        this.state = new DraftState_1.DraftState();
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
    publish(user) {
        this.state.publish(this, user);
    }
}
exports.MovieScript = MovieScript;
//# sourceMappingURL=MovieScript.js.map
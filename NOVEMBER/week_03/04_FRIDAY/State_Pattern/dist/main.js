"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MovieScript_1 = require("./MovieScript");
const User_1 = require("./User");
const DraftState_1 = require("./Document State/DraftState");
const script = new MovieScript_1.MovieScript("My Movie", new DraftState_1.DraftState());
const user = new User_1.User("producer");
console.log("Initial state:", script.getState().constructor.name);
script.publish(user);
console.log("After first publish:", script.getState().constructor.name);
script.publish(user);
console.log("After second publish:", script.getState().constructor.name);
script.publish(user);
console.log("After third publish:", script.getState().constructor.name);
//# sourceMappingURL=main.js.map
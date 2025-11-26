import { MovieScript } from "./MovieScript";
import { User } from "./User";
import { DraftState } from "./Document State/DraftState";

const script = new MovieScript("My Movie", new DraftState());
const user = new User("producer");

console.log("Initial state:", script.getState().constructor.name);

script.publish(user);
console.log("After first publish:", script.getState().constructor.name);

script.publish(user);
console.log("After second publish:", script.getState().constructor.name);

script.publish(user);
console.log("After third publish:", script.getState().constructor.name);

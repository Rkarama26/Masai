import { DraftState } from "./Document State/DraftState";
import { Doc, DocumentState } from "./types";
import type { User } from "./User";

export class MovieScript implements Doc {
  name: string;
  state: DocumentState;

  constructor(name: string, state: DocumentState) {
    this.name = name;
    this.state = new DraftState();
  }

  setState(state: DocumentState): void {
    this.state = state;
  }

  getState(): DocumentState {
    return this.state;
  }

  publish(user: User): void {
    this.state.publish(this, user);
  }
}

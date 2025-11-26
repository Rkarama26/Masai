import type { User } from "./User";

export interface Doc {
  name: string;
  state: DocumentState;
  setState(state: DocumentState): void;
  publish(user: User): void;
}

export interface DocumentState {
  publish(doc: Doc, user: User): void;
}

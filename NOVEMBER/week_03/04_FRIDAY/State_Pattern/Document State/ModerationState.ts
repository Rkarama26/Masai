import type { Doc, DocumentState } from "../types";
import type { User } from "../User";
import { PublishedState } from "./PublishedState";

export class ModerationState implements DocumentState {
  publish(document: Doc, user: User): void {
    if (user.role === "scriptwriter") {
      console.log(
        `${document.name} script cannot be published by ${user.role}`
      );
    } else if (user.role === "actor") {
      console.log(
        `${document.name} script cannot be published by ${user.role}`
      );
    } else if (user.role === "producer") {
      console.log(`${document.name} script is published by ${user.role}`);
      document.setState(new PublishedState());
    } else {
      throw new Error("Invalid user role!!!");
    }
  }
}

import type { Doc, DocumentState } from "../types";
import type { User } from "../User";

export class PublishedState implements DocumentState {
  publish(document: Doc, user: User): void {
    console.log(`${document.name} script is already published.`);
  }
  
}

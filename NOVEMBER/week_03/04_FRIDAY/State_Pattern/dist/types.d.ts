import type { User } from "./User";
export interface Doc {
    name: string;
    state: DocumentState;
    setState(state: DocumentState): void;
    getState(): DocumentState;
    publish(user: User): void;
}
export interface DocumentState {
    publish(doc: Doc, user: User): void;
}
//# sourceMappingURL=types.d.ts.map
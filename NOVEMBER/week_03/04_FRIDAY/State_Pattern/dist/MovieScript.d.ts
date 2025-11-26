import { Doc, DocumentState } from "./types";
import type { User } from "./User";
export declare class MovieScript implements Doc {
    name: string;
    state: DocumentState;
    constructor(name: string, state: DocumentState);
    setState(state: DocumentState): void;
    getState(): DocumentState;
    publish(user: User): void;
}
//# sourceMappingURL=MovieScript.d.ts.map
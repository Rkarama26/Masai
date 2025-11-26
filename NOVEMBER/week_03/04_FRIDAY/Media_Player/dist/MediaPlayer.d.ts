import type { IMediaPlayer, IPlayerState } from "./types";
export declare class MediaPlayer implements IMediaPlayer {
    state: IPlayerState;
    constructor();
    play(): void;
    pause(): void;
    stop(): void;
    setState(state: IPlayerState): void;
}
//# sourceMappingURL=MediaPlayer.d.ts.map
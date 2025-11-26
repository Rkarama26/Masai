export interface IMediaPlayer {
    state: IPlayerState;
    play(): void;
    pause(): void;
    stop(): void;
    setState(state: IPlayerState): void;
}
export interface IPlayerState {
    play(player: IMediaPlayer): void;
    pause(player: IMediaPlayer): void;
    stop(player: IMediaPlayer): void;
}
//# sourceMappingURL=types.d.ts.map
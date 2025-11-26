import { StopState } from "./states/StopState";
import type { IMediaPlayer, IPlayerState } from "./types";

export class MediaPlayer implements IMediaPlayer {
  state: IPlayerState;

  constructor() {
    this.state = new StopState(); // Start in Stop state
  }

  play(): void {
    this.state.play(this);
  }

  pause(): void {
    this.state.pause(this);
  }

  stop(): void {
    this.state.stop(this);
  }

  setState(state: IPlayerState): void {
    this.state = state;
  }
}

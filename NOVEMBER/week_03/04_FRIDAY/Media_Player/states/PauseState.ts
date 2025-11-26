import type { IMediaPlayer, IPlayerState } from "../types";
import { PlayState } from "./PlayState";
import { StopState } from "./StopState";

export class PauseState implements IPlayerState {
  play(player: IMediaPlayer): void {
    console.log("Resuming playback.");
    player.setState(new PlayState());
  }

  pause(player: IMediaPlayer): void {
    console.log("Already paused.");
  }

  stop(player: IMediaPlayer): void {
    console.log("Stopping from pause.");
    player.setState(new StopState());
  }
}

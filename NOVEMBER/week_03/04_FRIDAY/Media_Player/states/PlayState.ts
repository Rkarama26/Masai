import type { IMediaPlayer, IPlayerState } from "../types";
import { PauseState } from "./PauseState";
import { StopState } from "./StopState";

export class PlayState implements IPlayerState {
  play(player: IMediaPlayer): void {
    console.log("Already playing.");
  }

  pause(player: IMediaPlayer): void {
    console.log("Pausing playback.");
    player.setState(new PauseState());
  }

  stop(player: IMediaPlayer): void {
    console.log("Stopping playback.");
    player.setState(new StopState());
  }
}

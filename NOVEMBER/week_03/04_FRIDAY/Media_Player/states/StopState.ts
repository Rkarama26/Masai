import type { IMediaPlayer, IPlayerState } from "../types";
import { PlayState } from "./PlayState";

export class StopState implements IPlayerState {
  play(player: IMediaPlayer): void {
    console.log("Starting playback from the beginning.");
    player.setState(new PlayState());
  }

  pause(player: IMediaPlayer): void {
    console.log("Cannot pause while stopped.");
  }

  stop(player: IMediaPlayer): void {
    console.log("Already stopped.");
  }
}

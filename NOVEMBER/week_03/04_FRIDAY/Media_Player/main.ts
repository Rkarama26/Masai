import { MediaPlayer } from "./MediaPlayer";

const player = new MediaPlayer();

console.log("=== Media Player Simulation ===");

player.play(); // Stop → Play

player.pause(); // Play → Pause

player.play(); // Pause → Play

player.stop(); // Play → Stop

player.pause(); // Stop: Cannot pause

player.stop(); // Stop: Already stopped

player.play(); // Stop → Play again

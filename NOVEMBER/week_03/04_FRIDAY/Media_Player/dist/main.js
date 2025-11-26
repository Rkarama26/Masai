"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MediaPlayer_1 = require("./MediaPlayer");
const player = new MediaPlayer_1.MediaPlayer();
console.log("=== Media Player Simulation ===");
// Start in Stop state
player.play(); // Stop → Play
player.pause(); // Play → Pause
player.play(); // Pause → Play
player.stop(); // Play → Stop
player.pause(); // Stop: Cannot pause
player.stop(); // Stop: Already stopped
player.play(); // Stop → Play again
//# sourceMappingURL=main.js.map
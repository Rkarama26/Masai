"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
class TicTacToe {
    constructor() {
        this.board = [
            ["_", "_", "_"],
            ["_", "_", "_"],
            ["_", "_", "_"],
        ];
        this.players = [
            { name: "", symbol: "" },
            { name: "", symbol: "" },
        ];
        this.currentPlayerIndex = 0;
        this.lockedCenter = null;
    }
    displayBoard() {
        console.log("  1 2 3");
        console.log("A " + this.board[0].join(" "));
        console.log("B " + this.board[1].join(" "));
        console.log("C " + this.board[2].join(" "));
    }
    parseMove(move) {
        if (move.length !== 2)
            return null;
        const row = move[0].toUpperCase();
        const col = parseInt(move[1]);
        if (row < "A" || row > "C" || col < 1 || col > 3)
            return null;
        return [row.charCodeAt(0) - "A".charCodeAt(0), col - 1];
    }
    isValidMove(row, col) {
        if (this.board[row][col] !== "_")
            return false;
        if (row === 1 &&
            col === 1 &&
            this.lockedCenter &&
            this.lockedCenter !== this.players[this.currentPlayerIndex].symbol) {
            return false;
        }
        return true;
    }
    makeMove(row, col) {
        this.board[row][col] = this.players[this.currentPlayerIndex].symbol;
        this.checkDiagonalLock();
    }
    checkDiagonalLock() {
        const symbol = this.players[this.currentPlayerIndex].symbol;
        const corners = [
            [0, 0],
            [0, 2],
            [2, 0],
            [2, 2],
        ];
        const markedCorners = corners.filter(([r, c]) => this.board[r][c] === symbol);
        if (markedCorners.length >= 2) {
            // Check if they form a diagonal
            const hasA1C3 = this.board[0][0] === symbol && this.board[2][2] === symbol;
            const hasA3C1 = this.board[0][2] === symbol && this.board[2][0] === symbol;
            if (hasA1C3 || hasA3C1) {
                if (this.board[1][1] === "_") {
                    this.lockedCenter = symbol;
                    console.log(`Center cell B2 is now locked for ${this.players[this.currentPlayerIndex].name}!`);
                }
            }
        }
    }
    checkWin() {
        const symbol = this.players[this.currentPlayerIndex].symbol;
        // Rows
        for (let i = 0; i < 3; i++) {
            if (this.board[i].every((cell) => cell === symbol))
                return true;
        }
        // Columns
        for (let j = 0; j < 3; j++) {
            if (this.board.every((row) => row[j] === symbol))
                return true;
        }
        // Diagonals
        if (this.board[0][0] === symbol &&
            this.board[1][1] === symbol &&
            this.board[2][2] === symbol)
            return true;
        if (this.board[0][2] === symbol &&
            this.board[1][1] === symbol &&
            this.board[2][0] === symbol)
            return true;
        return false;
    }
    checkDraw() {
        return this.board.every((row) => row.every((cell) => cell !== "_"));
    }
    registerPlayers() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const askPlayer = (index) => {
            return new Promise((resolve) => {
                rl.question(`Enter name for Player ${index + 1}: `, (name) => {
                    rl.question(`Enter symbol for Player ${index + 1} (not '_'): `, (symbol) => {
                        if (symbol === "_") {
                            console.log('Symbol cannot be "_". Try again.');
                            resolve(askPlayer(index));
                            return;
                        }
                        if (index === 1 && symbol === this.players[0].symbol) {
                            console.log("Symbols must be unique. Try again.");
                            resolve(askPlayer(index));
                            return;
                        }
                        this.players[index] = { name, symbol };
                        resolve();
                    });
                });
            });
        };
        const register = async () => {
            await askPlayer(0);
            await askPlayer(1);
            rl.close();
        };
        register();
    }
    async playGame() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        while (true) {
            this.displayBoard();
            const currentPlayer = this.players[this.currentPlayerIndex];
            console.log(`${currentPlayer.name}'s turn (${currentPlayer.symbol}). Enter move (e.g., A1): `);
            const move = await new Promise((resolve) => {
                rl.question("", resolve);
            });
            const coords = this.parseMove(move);
            if (!coords) {
                console.log("Invalid move. Try again.");
                continue;
            }
            const [row, col] = coords;
            if (!this.isValidMove(row, col)) {
                console.log("Invalid move. Cell is occupied or locked. Try again.");
                continue;
            }
            this.makeMove(row, col);
            if (this.checkWin()) {
                this.displayBoard();
                console.log(`${currentPlayer.name} wins!`);
                rl.close();
                return;
            }
            if (this.checkDraw()) {
                this.displayBoard();
                console.log("It's a draw!");
                rl.close();
                return;
            }
            this.currentPlayerIndex = 1 - this.currentPlayerIndex;
        }
    }
    async start() {
        console.log("Welcome to Tic-Tac-Toe (Diagonal-Lock Variant)!");
        await this.registerPlayers();
        await this.playGame();
    }
}
const game = new TicTacToe();
game.start();

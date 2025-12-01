import * as readline from "readline";

interface Player {
  name: string;
  symbol: string;
}

type Board = string[][];

class TicTacToe {
  private board: Board;
  private players: [Player, Player];
  private currentPlayerIndex: number;
  private lockedCenter: string | null; // Symbol that locked the center, or null

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

  private displayBoard(): void {
    console.log("  1 2 3");
    console.log("A " + this.board[0].join(" "));
    console.log("B " + this.board[1].join(" "));
    console.log("C " + this.board[2].join(" "));
  }

  private parseMove(move: string): [number, number] | null {
    if (move.length !== 2) return null;
    const row = move[0].toUpperCase();
    const col = parseInt(move[1]);
    if (row < "A" || row > "C" || col < 1 || col > 3) return null;
    return [row.charCodeAt(0) - "A".charCodeAt(0), col - 1];
  }

  private isValidMove(row: number, col: number): boolean {
    if (this.board[row][col] !== "_") return false;
    if (
      row === 1 &&
      col === 1 &&
      this.lockedCenter &&
      this.lockedCenter !== this.players[this.currentPlayerIndex].symbol
    ) {
      return false;
    }
    return true;
  }

  private makeMove(row: number, col: number): void {
    this.board[row][col] = this.players[this.currentPlayerIndex].symbol;
    this.checkDiagonalLock();
  }

  private checkDiagonalLock(): void {
    const symbol = this.players[this.currentPlayerIndex].symbol;
    const corners = [
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
    ];
    const markedCorners = corners.filter(
      ([r, c]) => this.board[r][c] === symbol
    );
    if (markedCorners.length >= 2) {
      // Check if they form a diagonal
      const hasA1C3 =
        this.board[0][0] === symbol && this.board[2][2] === symbol;
      const hasA3C1 =
        this.board[0][2] === symbol && this.board[2][0] === symbol;
      if (hasA1C3 || hasA3C1) {
        if (this.board[1][1] === "_") {
          this.lockedCenter = symbol;
          console.log(
            `Center cell B2 is now locked for ${
              this.players[this.currentPlayerIndex].name
            }!`
          );
        }
      }
    }
  }

  private checkWin(): boolean {
    const symbol = this.players[this.currentPlayerIndex].symbol;
    // Rows
    for (let i = 0; i < 3; i++) {
      if (this.board[i].every((cell) => cell === symbol)) return true;
    }
    // Columns
    for (let j = 0; j < 3; j++) {
      if (this.board.every((row) => row[j] === symbol)) return true;
    }
    // Diagonals
    if (
      this.board[0][0] === symbol &&
      this.board[1][1] === symbol &&
      this.board[2][2] === symbol
    )
      return true;
    if (
      this.board[0][2] === symbol &&
      this.board[1][1] === symbol &&
      this.board[2][0] === symbol
    )
      return true;
    return false;
  }

  private checkDraw(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== "_"));
  }

  private registerPlayers(): void {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const askPlayer = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        rl.question(`Enter name for Player ${index + 1}: `, (name) => {
          rl.question(
            `Enter symbol for Player ${index + 1} (not '_'): `,
            (symbol) => {
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
            }
          );
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

  private async playGame(): Promise<void> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    while (true) {
      this.displayBoard();
      const currentPlayer = this.players[this.currentPlayerIndex];
      console.log(
        `${currentPlayer.name}'s turn (${currentPlayer.symbol}). Enter move (e.g., A1): `
      );

      const move = await new Promise<string>((resolve) => {
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

  public async start(): Promise<void> {
    console.log("Welcome to Tic-Tac-Toe (Diagonal-Lock Variant)!");
    await this.registerPlayers();
    await this.playGame();
  }
}

const game = new TicTacToe();
game.start();

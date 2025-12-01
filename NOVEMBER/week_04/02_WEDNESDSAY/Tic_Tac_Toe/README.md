# Tic-Tac-Toe (Diagonal-Lock Variant)

A console-based Tic-Tac-Toe game with a special diagonal lock rule implemented in TypeScript.

## Features

- 3x3 grid with rows A-C and columns 1-3
- Player registration with unique symbols
- Diagonal lock rule: If a player marks both diagonal corners (A1 and C3 or A3 and C1), the center B2 is locked for them
- Win detection for rows, columns, and diagonals
- Draw detection
- Input validation

## How to Run

1. Install dependencies:

   ```
   npm install
   ```

2. Build the project:

   ```
   npm run build
   ```

3. Run the game:
   ```
   npm start
   ```

Or for development:

```
npm run dev
```

## Gameplay

- Two players register with names and symbols (e.g., X, O)
- Players take turns entering coordinates like A1, B2, C3
- The game enforces the diagonal lock rule
- Game ends on win or draw

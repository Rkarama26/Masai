export class GameCharacter {
  constructor(
    public name: string,
    public level: number,
    public weapon: string
  ) {}

  clone(): GameCharacter {
    return new GameCharacter(this.name, this.level, this.weapon);
  }

  toString(): string {
    return `GameCharacter [name=${this.name}, level=${this.level}, weapon=${this.weapon}]`;
  }
}

export class Pizza {
  constructor(
    public size: string,
    public cheese: boolean,
    public pepperoni: boolean,
    public mushrooms: boolean
  ) {}

  toString(): string {
    return `Pizza [size=${this.size}, cheese=${this.cheese}, pepperoni=${this.pepperoni}, mushrooms=${this.mushrooms}]`;
  }
}

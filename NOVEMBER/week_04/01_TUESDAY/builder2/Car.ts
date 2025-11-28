export class Car {
  constructor(
    public brand: string,
    public engine: string,
    public color: string,
    public sunroof: boolean,
    public automaticTransmission: boolean
  ) {}

  toString(): string {
    return `Car [brand=${this.brand}, engine=${this.engine}, color=${this.color}, sunroof=${this.sunroof}, automaticTransmission=${this.automaticTransmission}]`;
  }
}

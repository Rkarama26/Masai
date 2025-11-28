import { Car } from './Car';
export declare class CarBuilder {
    private brand;
    private engine;
    private color;
    private sunroof;
    private automaticTransmission;
    setBrand(brand: string): CarBuilder;
    setEngine(engine: string): CarBuilder;
    setColor(color: string): CarBuilder;
    setSunroof(sunroof: boolean): CarBuilder;
    setAutomaticTransmission(automaticTransmission: boolean): CarBuilder;
    build(): Car;
}
//# sourceMappingURL=CarBuilder.d.ts.map
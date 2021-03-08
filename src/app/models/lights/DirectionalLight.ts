import { Light } from "./Light";

export class DirectionalLight extends Light {
  direction: [number, number, number];

  constructor(intensity: number, direction: [number, number, number]) {
    super(intensity);
    this.direction = direction;
  }
}

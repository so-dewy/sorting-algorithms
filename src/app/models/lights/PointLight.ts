import { Light } from "./Light";

export class PointLight extends Light {
  position: [number, number, number];

  constructor(intensity: number, position: [number, number, number]) {
    super(intensity);
    this.position = position;
  }
}

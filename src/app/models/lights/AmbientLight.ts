import { Light } from "./Light";

export class AmbientLight extends Light {
  constructor(intensity: number) {
    super(intensity);
  }
}

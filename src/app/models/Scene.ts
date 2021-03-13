import { Color } from "./Color";
import { Light } from "./lights/Light";
import { Sphere } from "./Sphere";

export interface Scene {
  backgroundColor: Color,
  canvasToViewportDistance: number,
  viewportWidth: number,
  viewportHeight: number,
  spheres: Sphere[],
  lights: Light[]
}

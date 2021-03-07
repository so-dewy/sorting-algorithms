import { ISphere } from "./ISphere";

export interface Scene {
  backgroundColor: [number, number, number],
  canvasToViewportDistance: number,
  viewportWidth: number,
  viewportHeight: number,
  spheres: ISphere[]
}

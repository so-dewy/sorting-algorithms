import { Color } from "./Color";
import { Vector } from "./vector";

export interface Sphere {
    center: Vector,
    radius: number,
    shininess: number,
    reflectiveness: number,
    color: Color
}

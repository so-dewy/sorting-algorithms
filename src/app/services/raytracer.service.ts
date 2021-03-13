import { Injectable } from '@angular/core';
import { Color } from '../models/Color';
import { AmbientLight } from '../models/lights/AmbientLight';
import { DirectionalLight } from '../models/lights/DirectionalLight';
import { PointLight } from '../models/lights/PointLight';
import { Scene } from '../models/Scene';
import { Sphere } from '../models/Sphere';
import { Vector } from '../models/vector';
import { LinearAlgebraService } from './linear-algebra.service';

@Injectable({
  providedIn: 'root'
})
export class RaytracerService {
  private scene: Scene;

  constructor(private linAlgSevice: LinearAlgebraService) {
  }

  setScene(scene: Scene) {
    this.scene = scene;
  }

  calculateViewportDirection(x: number, y: number, canvasWidth: number, canvasHeight: number): Vector {
    return [
      (x * this.scene.viewportWidth) / canvasWidth, 
      (y * this.scene.viewportHeight) / canvasHeight,
      this.scene.canvasToViewportDistance
    ];
  }

  traceRay(cameraPosition: Vector, viewportPosition: Vector, intersectionMin: number, intersectionMax: number, recursionDepth: number): Color {
    const [closesetSphere, closesetIntersection] = this.closestIntersection(cameraPosition, viewportPosition, intersectionMin, intersectionMax);
    
    if (!closesetSphere) {
      return this.scene.backgroundColor;
    }

    const closesetIntersectionPoint = this.linAlgSevice.vectorSum(cameraPosition, viewportPosition.map(el => el * closesetIntersection) as Vector);

    const sphereNormalDirection = this.linAlgSevice.vectorSubtraction(closesetIntersectionPoint, closesetSphere.center);

    const sphereNormalDirectionLength = this.linAlgSevice.vectorLength(sphereNormalDirection);

    const sphereNormal = sphereNormalDirection.map(el => el / sphereNormalDirectionLength) as Vector;

    const lightingCoefficient = this.computeLighting(closesetIntersectionPoint, sphereNormal, viewportPosition.map(el => -el) as Vector, closesetSphere.shininess);
    
    const localColor = closesetSphere.color.map(el => el * lightingCoefficient) as Color;

    const reflectivness = closesetSphere.reflectiveness;
    if (recursionDepth <= 0 || reflectivness <= 0) {
      return localColor;
    }
    
    const reflectionVector = this.reflectRay(viewportPosition.map(el => -el) as Color, sphereNormal);
    const reflectedColor = this.traceRay(closesetIntersectionPoint, reflectionVector, 0.001, Infinity, recursionDepth - 1);

    return this.linAlgSevice.vectorSum(localColor.map(el => el * (1 - reflectivness)) as Vector, reflectedColor.map(el => el * reflectivness) as Vector);
  }

  closestIntersection(point: Vector, rayDirection: Vector, intersectionMin: number, intersectionMax: number): [Sphere, number] {
    let closesetIntersection = Infinity;
    let closesetSphere: Sphere = null;
    for (const sphere of this.scene.spheres) {
      const [intersection1, intersection2] = this.calculateIntersections(point, rayDirection, sphere);
      if (intersection1 >= intersectionMin && intersection1 <= intersectionMax 
        && intersection1 < closesetIntersection) {
        closesetIntersection = intersection1;
        closesetSphere = sphere;
      }
      if (intersection2 >= intersectionMin && intersection2 <= intersectionMax 
        && intersection2 < closesetIntersection) {
        closesetIntersection = intersection2;
        closesetSphere = sphere;
      }
    }
    return [closesetSphere, closesetIntersection];
  }

  computeLighting(point: Vector, normal: Vector, cameraToObjectVector: Vector, shininess: number): number {
    let lightIntensity = 0;
    let lightVector: Vector;
    let intersectionMax = Infinity;

    for (const light of this.scene.lights) {
      if (light instanceof AmbientLight) {
        lightIntensity += light.intensity;
      } else {
        if (light instanceof PointLight) {
          lightVector = this.linAlgSevice.vectorSubtraction(light.position, point);
          intersectionMax = 1;
        } else if (light instanceof DirectionalLight) {
          lightVector = light.direction;
          intersectionMax = Infinity;
        }

        const [shadowSphere, shadowIntersection] = this.closestIntersection(point, lightVector, 0.001, intersectionMax);
        if (shadowSphere) {
          continue;
        }

        const productNL = this.linAlgSevice.vectorDotProduct(normal, lightVector);

        if (productNL > 0) {
          lightIntensity += light.intensity * productNL / (this.linAlgSevice.vectorLength(normal) * this.linAlgSevice.vectorLength(lightVector));
        }

        if (shininess != -1) {
          const reflectionVector = this.reflectRay(lightVector, normal);
          const product = this.linAlgSevice.vectorDotProduct(reflectionVector, cameraToObjectVector);
          if (product > 0) {
            lightIntensity += light.intensity * Math.pow(product / (this.linAlgSevice.vectorLength(reflectionVector) * this.linAlgSevice.vectorLength(cameraToObjectVector)), shininess);
          }
        }
      }
    }

    return lightIntensity;
  }

  reflectRay(ray: Vector, normal: Vector) {
    const product = this.linAlgSevice.vectorDotProduct(normal, ray);
    return this.linAlgSevice.vectorSubtraction(normal.map(el => 2 * product * el) as Vector, ray);
  }

  calculateIntersections(cameraPosition: Vector, viewportPosition: Vector, sphere: any): [number, number] {
    const radius = sphere.radius;
    const cameraToSphereVector: Vector = [
      cameraPosition[0] - sphere.center[0],
      cameraPosition[1] - sphere.center[1],
      cameraPosition[2] - sphere.center[2],
    ];
    const a = this.linAlgSevice.vectorDotProduct(viewportPosition, viewportPosition);
    const b = 2 * this.linAlgSevice.vectorDotProduct(cameraToSphereVector, viewportPosition);
    const c = this.linAlgSevice.vectorDotProduct(cameraToSphereVector, cameraToSphereVector) - radius * radius;

    const discriminant = b * b - 4 * a *c;
    if (discriminant < 0) {
      return [Infinity, Infinity];
    }

    const intersection1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const intersection2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [intersection1, intersection2];
  }
}

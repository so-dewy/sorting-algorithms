import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Sphere } from 'src/app/models/Sphere';
import { Scene } from 'src/app/models/Scene';
import { AmbientLight } from 'src/app/models/lights/AmbientLight';
import { PointLight } from 'src/app/models/lights/PointLight';
import { DirectionalLight } from 'src/app/models/lights/DirectionalLight';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  scene: Scene = {
    canvasToViewportDistance: 1,
    backgroundColor: [0, 0, 0],
    // backgroundColor: [255, 255, 255],
    viewportHeight: 1,
    viewportWidth: 1,
    spheres: [
      {
        center: [0, -1, 3],
        radius: 1,
        shininess: 500, // shiny
        reflectiveness: 0.2, // reflective
        color: [255, 0, 0]
      },
      // {
      //   center: [0, 0.5, 1.5],
      //   radius: 0.2,
      //   shininess: 500, // shiny
      //   reflectiveness: 0.2, // reflective
      //   color: [0, 50, 255]
      // },
      // {
      //   center: [0, 0.2, 1.5],
      //   radius: 0.2,
      //   shininess: 1, // shiny
      //   reflectiveness: 0.2, // reflective
      //   color: [0, 50, 255]
      // },
      {
        center: [2, 0, 4],
        radius: 1,
        shininess: 500, // shiny
        reflectiveness: 0.3, // a bit more reflective
        color: [0, 0, 255]
      },
      {
        center: [-2, 0, 4],
        radius: 1,
        shininess: 10, // somewhat shiny
        reflectiveness: 0.4, // even more reflective
        color: [0, 255, 0]
      },
      {
        center: [0, -5001, 0],
        radius: 5000,
        shininess: 1000, // very shiny
        reflectiveness: 0.5, // half reflective
        color: [255, 255, 0]
      }
    ],
    lights: [
      new AmbientLight(0.2),
      new PointLight(0.6, [2, 1, 0]),
      new DirectionalLight(0.2, [1, 4, 4]),
    ]
  };
  imageData: ImageData;
  recursionDepth: number = 3; 

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.canvasWidth = this.canvas.nativeElement.width;
    this.canvasHeight = this.canvas.nativeElement.height;

    this.imageData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);

    this.drawScene();
  }

  drawScene() {
    const cameraPosition = [0, 0, 0];
    const rightBorder = this.canvasWidth / 2;
    const leftBorder = -rightBorder;
    const topBorder = this.canvasHeight / 2;
    const bottomBorder = -topBorder;
    for (let x = leftBorder; x <= rightBorder; x++) {
      for (let y = bottomBorder; y <= topBorder; y++) {
        const viewportPosition = this.calculateViewportPosition(x, y);
        const pixelColor = this.traceRay(cameraPosition, viewportPosition, 1, Infinity, this.recursionDepth);

        this.drawPixel(x, y, pixelColor);
      }
    }
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  drawPixel(x: number, y: number, pixelColor: [number, number, number]) {
    const screenX = x - this.canvasWidth / 2;
    const screenY = this.canvasWidth / 2 - y;

    const offset = 4 * (screenX + screenY * this.imageData.width);
  
    this.imageData.data[offset] = pixelColor[0];
    this.imageData.data[offset + 1] = pixelColor[1];
    this.imageData.data[offset + 2] = pixelColor[2];
    this.imageData.data[offset + 3] = 255;
  }

  calculateViewportPosition(x: number, y: number): number[] {
    return [
      (x * this.scene.viewportWidth) / this.canvasWidth, 
      (y * this.scene.viewportHeight) / this.canvasHeight,
      this.scene.canvasToViewportDistance
    ];
  }

  traceRay(cameraPosition: number[], viewportPosition: number[], intersectionMin: number, intersectionMax: number, recursionDepth: number): [number, number, number] {
    const [closesetSphere, closesetIntersection] = this.closestIntersection(cameraPosition, viewportPosition, intersectionMin, intersectionMax);
    
    if (!closesetSphere) {
      return this.scene.backgroundColor;
    }

    const closesetIntersectionPoint = this.vectorSum(cameraPosition, viewportPosition.map(el => el * closesetIntersection));

    const sphereNormalDirection = this.vectorSubtraction(closesetIntersectionPoint, closesetSphere.center);

    const sphereNormalDirectionLength = this.vectorLength(sphereNormalDirection);

    const sphereNormal = sphereNormalDirection.map(el => el / sphereNormalDirectionLength);

    const lightingCoefficient = this.computeLighting(closesetIntersectionPoint, sphereNormal, viewportPosition.map(el => -el), closesetSphere.shininess);
    
    const localColor = closesetSphere.color.map(el => el * lightingCoefficient) as [number, number, number];

    const reflectivness = closesetSphere.reflectiveness;
    if (recursionDepth <= 0 || reflectivness <= 0) {
      return localColor;
    }
    
    const reflectionVector = this.reflectRay(viewportPosition.map(el => -el) as [number, number, number], sphereNormal);
    const reflectedColor = this.traceRay(closesetIntersectionPoint, reflectionVector, 0.001, Infinity, recursionDepth - 1);

    return this.vectorSum(localColor.map(el => el * (1 - reflectivness)), reflectedColor.map(el => el * reflectivness)) as [number, number, number];
  }

  closestIntersection(point: number[], rayDirection: number[], intersectionMin: number, intersectionMax: number): [Sphere, number] {
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

  computeLighting(point: number[], normal: number[], cameraToObjectVector: number[], shininess: number): number {
    let lightIntensity = 0;
    let lightVector: [number, number, number];
    let intersectionMax = Infinity;

    for (const light of this.scene.lights) {
      if (light instanceof AmbientLight) {
        lightIntensity += light.intensity;
      } else {
        if (light instanceof PointLight) {
          lightVector = this.vectorSubtraction(light.position, point);
          intersectionMax = 1;
        } else if (light instanceof DirectionalLight) {
          lightVector = light.direction;
          intersectionMax = Infinity;
        }

        const [shadowSphere, shadowIntersection] = this.closestIntersection(point, lightVector, 0.001, intersectionMax);
        if (shadowSphere) {
          continue;
        }

        const productNL = this.vectorDotProduct(normal, lightVector);

        if (productNL > 0) {
          lightIntensity += light.intensity * productNL / (this.vectorLength(normal) * this.vectorLength(lightVector));
        }

        if (shininess != -1) {
          const reflectionVector = this.reflectRay(lightVector, normal);
          const product = this.vectorDotProduct(reflectionVector, cameraToObjectVector);
          if (product > 0) {
            lightIntensity += light.intensity * Math.pow(product / (this.vectorLength(reflectionVector) * this.vectorLength(cameraToObjectVector)), shininess);
          }
        }
      }
    }

    return lightIntensity;
  }

  reflectRay(ray: [number, number, number], normal: number[]) {
    const product = this.vectorDotProduct(normal, ray);
    return this.vectorSubtraction(normal.map(el => 2 * product * el), ray);
  }

  calculateIntersections(cameraPosition: number[], viewportPosition: number[], sphere: any): [number, number] {
    const radius = sphere.radius;
    const cameraToSphereVector = [
      cameraPosition[0] - sphere.center[0],
      cameraPosition[1] - sphere.center[1],
      cameraPosition[2] - sphere.center[2],
    ];
    const a = this.vectorDotProduct(viewportPosition, viewportPosition);
    const b = 2 * this.vectorDotProduct(cameraToSphereVector, viewportPosition);
    const c = this.vectorDotProduct(cameraToSphereVector, cameraToSphereVector) - radius * radius;

    const discriminant = b * b - 4 * a *c;
    if (discriminant < 0) {
      return [Infinity, Infinity];
    }

    const intersection1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const intersection2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [intersection1, intersection2];
  }

  vectorSum(vector1: number[], vector2: number[]): number[] {
    return [vector1[0] + vector2[0], vector1[1] + vector2[1], vector1[2] + vector2[2]];
  }

  vectorSubtraction(vector1: number[], vector2: number[]): [number, number, number] {
    return [vector1[0] - vector2[0], vector1[1] - vector2[1], vector1[2] - vector2[2]];
  }

  vectorDotProduct(vector1: number[], vector2: number[]): number {
    return vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2];
  }

  vectorLength(vector: number[]) {
    return Math.sqrt(this.vectorDotProduct(vector, vector));
  }

}

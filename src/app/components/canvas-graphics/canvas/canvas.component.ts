import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ISphere } from 'src/app/models/ISphere';

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
  viewportWidth: number;
  viewportHeight: number;
  canvasToViewportDistance: number = 1;
  BACKGROUND_COLOR: [number, number, number];
  scene: { spheres: ISphere[] } = {
    spheres: [
      {
        center: [0, -1, 3],
        radius: 1,
        color: [255, 0, 0]
      },
      {
        center: [2, 0, 4],
        radius: 1,
        color: [0, 0, 255]
      },
      {
        center: [-2, 0, 4],
        radius: 1,
        color: [0, 255, 0]
      }
    ]
  };
  imageData: ImageData;

  constructor() { }

  ngOnInit(): void {
    this.BACKGROUND_COLOR = [255, 255, 255];
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.canvasWidth = this.canvas.nativeElement.width;
    this.canvasHeight = this.canvas.nativeElement.height;
    this.viewportWidth = 1;
    this.viewportHeight = 1;

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
        const pixelColor = this.traceRay(cameraPosition, viewportPosition, 1, Infinity);

        this.drawPixel(x, y, pixelColor);
      }
    }
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  drawPixel(x: number, y: number, pixelColor: [number, number, number]) {
    const screenX = x - this.canvasWidth / 2;
    const screenY = this.canvasWidth / 2 - y;
    var offset = 4 * (screenX + screenY * this.imageData.width);
  
    this.imageData.data[offset] = pixelColor[0];
    this.imageData.data[offset + 1] = pixelColor[1];
    this.imageData.data[offset + 2] = pixelColor[2];
    this.imageData.data[offset + 3] = 255;
  }

  calculateViewportPosition(x: number, y: number): number[] {
    return [
      (x * this.viewportWidth) / this.canvasWidth, 
      (y * this.viewportHeight) / this.canvasHeight,
      this.canvasToViewportDistance
    ];
  }

  traceRay(cameraPosition: number[], viewportPosition: number[], intersectionMin: number, intersectionMax: number): [number, number, number] {
    let closesetIntersection = Infinity;
    let closesetSphere = null;

    for (const sphere of this.scene.spheres) {
      const [intersection1, intersection2] = this.calculateIntersections(cameraPosition, viewportPosition, sphere);
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
    return closesetSphere ? closesetSphere.color : this.BACKGROUND_COLOR;
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

  vectorDotProduct(vector1: number[], vector2: number[]): number {
    return vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2];
  }

}

import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';

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
  BACKGROUND_COLOR: string = 'white';
  scene = {
    spheres: [
      {
        center: [0, -1, 3],
        radius: 1,
        color: 'red'
      },
      {
        center: [2, 0, 4],
        radius: 1,
        color: 'blue'
      },
      {
        center: [-2, 0, 4],
        radius: 1,
        color: 'green'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    this.BACKGROUND_COLOR = 'white';
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.canvasWidth = this.canvas.nativeElement.width;
    this.canvasHeight = this.canvas.nativeElement.height;
    this.viewportWidth = 600;
    this.viewportHeight = 600;

    const centeredX = this.canvasWidth / 2;
    const centeredY = this.canvasHeight / 2;
    this.ctx.translate(centeredX, centeredY);

    this.drawScene();
  }

  drawScene() {
    const cameraPosition = [0, 0, 0];
    const rightBorder = this.canvas.nativeElement.width / 2;
    const leftBorder = -rightBorder;
    const topBorder = this.canvas.nativeElement.height / 2;
    const bottomBorder = -topBorder;
    for (let x = leftBorder; x <= rightBorder; x++) {
      for (let y = bottomBorder; y <= topBorder; y++) {
        const viewportPosition = this.calculateViewportPosition(x, y);
        const pixelColor = this.traceRay(cameraPosition, viewportPosition, 1, Number.POSITIVE_INFINITY);

        this.ctx.fillStyle = pixelColor;
        this.ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  calculateViewportPosition(x: number, y: number): number[] {
    return [
      (x * this.viewportWidth) / this.canvasWidth, 
      (y * this.viewportHeight) / this.viewportHeight,
      this.canvasToViewportDistance
    ];
  }

  traceRay(cameraPosition: number[], viewportPosition: number[], intersectionMin: number, intersectionMax: number): string {
    let closesetIntersection = Number.POSITIVE_INFINITY;
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
      return [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
    }

    const intersection1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const intersection2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [intersection1, intersection2];
  }

  vectorDotProduct(vector1: number[], vector2: number[]): number {
    return vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2];
  }

}

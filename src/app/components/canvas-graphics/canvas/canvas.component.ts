import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Sphere } from 'src/app/models/Sphere';
import { Scene } from 'src/app/models/Scene';
import { AmbientLight } from 'src/app/models/lights/AmbientLight';
import { PointLight } from 'src/app/models/lights/PointLight';
import { DirectionalLight } from 'src/app/models/lights/DirectionalLight';
import { RaytracerService } from 'src/app/services/raytracer.service';
import { LinearAlgebraService } from 'src/app/services/linear-algebra.service';
import { Color } from 'src/app/models/Color';
import { Vector } from 'src/app/models/vector';

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

  constructor(private raytracer: RaytracerService, private linAlgSevice: LinearAlgebraService) {
    raytracer.setScene(this.scene);
  }

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
    const cameraRotation = [
      [0.7071, 0, -0.7071],
      [0, 1, 0],
      [0.7071, 0,  0.7071]
    ];
    const cameraPosition: Vector = [3, 0, 1];
    const rightBorder = this.canvasWidth / 2;
    const leftBorder = -rightBorder;
    const topBorder = this.canvasHeight / 2;
    const bottomBorder = -topBorder;
    for (let x = leftBorder; x <= rightBorder; x++) {
      for (let y = bottomBorder; y <= topBorder; y++) {
        const viewportPosition = this.linAlgSevice.multiplyMV(cameraRotation, this.raytracer.calculateViewportDirection(x, y, this.canvasWidth, this.canvasHeight));
        const pixelColor = this.raytracer.traceRay(cameraPosition, viewportPosition, 1, Infinity, this.recursionDepth);

        this.drawPixel(x, y, pixelColor);
      }
    }
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  drawPixel(x: number, y: number, pixelColor: Color) {
    const screenX = x - this.canvasWidth / 2;
    const screenY = this.canvasWidth / 2 - y;

    const offset = 4 * (screenX + screenY * this.imageData.width);
  
    this.imageData.data[offset] = pixelColor[0];
    this.imageData.data[offset + 1] = pixelColor[1];
    this.imageData.data[offset + 2] = pixelColor[2];
    this.imageData.data[offset + 3] = 255;
  }
}

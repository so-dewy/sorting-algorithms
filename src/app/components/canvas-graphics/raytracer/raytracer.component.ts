import { Component, OnInit, ViewChild } from '@angular/core';
import { Scene } from 'src/app/models/Scene';
import { AmbientLight } from 'src/app/models/lights/AmbientLight';
import { PointLight } from 'src/app/models/lights/PointLight';
import { DirectionalLight } from 'src/app/models/lights/DirectionalLight';
import { RaytracerService } from 'src/app/services/raytracer.service';
import { LinearAlgebraService } from 'src/app/services/linear-algebra.service';
import { Vector } from 'src/app/models/vector';
import { AfterViewInit } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-raytracer',
  templateUrl: './raytracer.component.html',
  styleUrls: ['./raytracer.component.css']
})
export class RaytracerComponent implements OnInit, AfterViewInit {
  @ViewChild(CanvasComponent) private canvas: CanvasComponent;
  scene: Scene = {
    canvasToViewportDistance: 1,
    backgroundColor: [0, 0, 0],
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
      {
        center: [0, 0.5, 1.5],
        radius: 0.2,
        shininess: 500, // shiny
        reflectiveness: 0.2, // reflective
        color: [0, 50, 255]
      },
      {
        center: [0, 0.2, 1.5],
        radius: 0.2,
        shininess: 1, // shiny
        reflectiveness: 0.2, // reflective
        color: [0, 50, 255]
      },
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
  recursionDepth: number = 3; 

  constructor(private raytracer: RaytracerService, private linAlgSevice: LinearAlgebraService) {
    raytracer.setScene(this.scene);
  }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.drawScene();
  }
  
  drawScene() {
    const cameraRotation = [
      [0.7071, 0, -0.7071],
      [0, 1, 0],
      [0.7071, 0,  0.7071]
    ];
    const cameraPosition: Vector = [3, 0, 1];
    const rightBorder = this.canvas.canvasWidth / 2;
    const leftBorder = -rightBorder;
    const topBorder = this.canvas.canvasHeight / 2;
    const bottomBorder = -topBorder;
    for (let x = leftBorder; x <= rightBorder; x++) {
      for (let y = bottomBorder; y <= topBorder; y++) {
        const viewportPosition = this.linAlgSevice.multiplyMV(cameraRotation, this.raytracer.calculateViewportDirection(x, y, this.canvas.canvasWidth, this.canvas.canvasHeight));
       const pixelColor = this.raytracer.traceRay(cameraPosition, viewportPosition, 1, Infinity, this.recursionDepth);

        this.canvas.drawPixel(x, y, pixelColor);
      }
    }
    this.canvas.renderImage();
  }
}

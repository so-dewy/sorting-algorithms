import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Color } from 'src/app/models/Color';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas') private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  imageData: ImageData;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.canvasWidth = this.canvas.nativeElement.width;
    this.canvasHeight = this.canvas.nativeElement.height;

    this.imageData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
  }

  renderImage() {
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

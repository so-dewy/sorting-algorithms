import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinearAlgebraService {

  constructor() { }

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

  multiplyMV(matrix: number[][], vector: number[]) {
    return [
      matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2],
      matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2],
      matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2],
    ];
  }

}

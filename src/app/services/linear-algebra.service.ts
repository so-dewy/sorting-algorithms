import { Injectable } from '@angular/core';
import { Vector } from '../models/vector';

@Injectable({
  providedIn: 'root'
})
export class LinearAlgebraService {

  constructor() { }

  /**
   * Sums two vectors
   */
  vectorSum(vector1: Vector, vector2: Vector): Vector {
    return [vector1[0] + vector2[0], vector1[1] + vector2[1], vector1[2] + vector2[2]];
  }

  /**
   * Subtracts vector2 from vector1
   */
  vectorSubtraction(vector1: Vector, vector2: Vector): Vector {
    return [vector1[0] - vector2[0], vector1[1] - vector2[1], vector1[2] - vector2[2]];
  }

  /**
   * Calculates algebraic dot product of two vectors
   */
  vectorDotProduct(vector1: Vector, vector2: Vector): number {
    return vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2];
  }

  /**
   * Calculates length of the given vector
   */
  vectorLength(vector: Vector): number {
    return Math.sqrt(this.vectorDotProduct(vector, vector));
  }

  /**
   * Multiplies matrix and vector
   */
  multiplyMV(matrix: number[][], vector: Vector): Vector {
    return [
      matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2],
      matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2],
      matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2],
    ];
  }

}

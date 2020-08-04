import { ISortingStrategy } from '../models/ISortingStrategy';

export class BubbleSort implements ISortingStrategy {
  constructor() {
  }

  async *sort(array: number[], compareFn?: (a: number, b: number) => number) {  
    compareFn = compareFn ? compareFn : (a, b) => a - b;
    let buffer: number;
    let length = array.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {  
        // slow down sorting 
        await new Promise(resolve => setTimeout(resolve, 100));
        if (compareFn(array[j], array[j + 1]) > 0) {
          buffer = array[j];
          array[j] = array[j + 1];
          array[j + 1] = buffer;       
        }
        yield [j, j + 1];     
      }
    }
    return;
  }
}

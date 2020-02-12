import { ISortingStrategy } from '../models/ISortingStrategy';

export class BubbleSort implements ISortingStrategy{
    sort(array: number[], compareFn?: (a: number, b: number) => number): void {
        let buffer: number;
        for (let i = 0; i < array.length - 1; i++) {
          for (let j = i + 1; j < array.length; j++) {
            if (compareFn(array[i], array[j]) > 0) {
                buffer = array[i];
                array[i] = array[j];
                array[j] = buffer;
            }
          }
        }
    }
}

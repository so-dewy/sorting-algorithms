import { ISortingStrategy } from '../models/ISortingStrategy';
import { defaultCompareFn } from '../utils/util-functions';

export class BubbleSort implements ISortingStrategy {
  displayName: string;

  private _delay: number = 100;

  get delay() {
    return this._delay;
  }

  set delay(value: number) {
    this._delay = value;
  }

  constructor() {
    this.displayName = "Bubble sort";
  }

  async *sort(array: any[], compareFn?: (a: any, b: any) => any) {  
    compareFn = compareFn ? compareFn : defaultCompareFn;
    let buffer: any;
    let length = array.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {  
        // add delay
        await new Promise(resolve => setTimeout(resolve, this.delay));

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

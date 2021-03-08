import { Heap } from '../models/Heap';
import { ISortingStrategy } from '../models/ISortingStrategy';
import { defaultCompareFn } from '../utils/util-functions';

export class HeapSort implements ISortingStrategy  {  
  displayName: string;

  private _delay: number = 100;

  get delay() {
    return this._delay;
  }

  set delay(value: number) {
    this._delay = value;
  }
  
  constructor() {
    this.displayName = "Heap sort";
  }

  async *sort(array: any[], compareFn?: (a: any, b: any) => any) {  
    if (!array || !array.length) {
      return;
    }
    compareFn = compareFn ? compareFn : defaultCompareFn;
    let min;
    let length = array.length;

    const heap = new Heap(array);

    for (let i = 0; i < length; i++) {
      // slow down sorting 
      await new Promise(resolve => setTimeout(resolve, this.delay));

      min = heap.extractMinimum();
      yield [i];

      // Insert minimum value at the start
      array[i] = min;
    }
    return;
  }
}


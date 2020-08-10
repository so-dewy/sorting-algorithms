import { ISortingStrategy } from '../models/ISortingStrategy';
import { defaultCompareFn } from '../utils/util-functions';

export class SelectionSort implements ISortingStrategy  {  
  private _delay: number = 100;

  get delay() {
    return this._delay;
  }

  set delay(value: number) {
    this._delay = value;
  }
  
  constructor() {
  }

  async *sort(array: any[], compareFn?: (a: any, b: any) => any) {  
    if (!array || !array.length) {
      return;
    }
    compareFn = compareFn ? compareFn : defaultCompareFn;
    let min = {
      value: null,
      position: null
    };
    let length = array.length;
    for (let i = 0; i < length - 1; i++) {
      // slow down sorting 
      await new Promise(resolve => setTimeout(resolve, this.delay));

      min.value = array[length - 1];
      min.position = length - 1;
      for (let j = i; j < length; j++) {
        if (compareFn(array[j], min.value) < 0) {
          min.value = array[j];
          min.position = j;
        }
      }      
      yield [i, min.position];

      // Insert minimum value at the start
      array[min.position] = array[i];
      array[i] = min.value;
    }
    return;
  }
}

import { Injectable } from '@angular/core';
import { ISortingStrategy } from '../models/ISortingStrategy';
import { BubbleSort } from '../sorting-algorithms/bubble-sort';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  
  private _sortingStrategy: ISortingStrategy = new BubbleSort();
  get sortingStrategy() {
    return this._sortingStrategy;
  }
  set sortingStrategy(value: ISortingStrategy) {
    this.sortingStrategy = value;
  }

  constructor() { }
  

  sort(array: number[], compareFn?: (a: number, b: number) => number) {
    this.sortingStrategy.sort(array, compareFn);
  }
}

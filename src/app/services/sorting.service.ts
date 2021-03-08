import { Injectable } from '@angular/core';
import { ISortingStrategy } from '../models/ISortingStrategy';
import { BubbleSort } from '../sorting-algorithms/BubbleSort';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  private sortingStrategyEmitter = new Subject<string>();
  $sortingStrategyChange = this.sortingStrategyEmitter.asObservable();

  get displayName() {
    return this._sortingStrategy.displayName;
  }
  
  private _sortingStrategy: ISortingStrategy;

  get sortingStrategy() {
    return this._sortingStrategy;
  }
  
  set sortingStrategy(value: ISortingStrategy) {
    this._sortingStrategy = value;
    this.sortingStrategyEmitter.next(value.displayName);
  }

  constructor() { 
    this.sortingStrategy = new BubbleSort();
  }

  async *sort(array: number[], compareFn?: (a: number, b: number) => number) {
    const generator = this.sortingStrategy.sort(array, compareFn);
    
    for await (let value of generator) { 
      yield value;
    }
  }
}

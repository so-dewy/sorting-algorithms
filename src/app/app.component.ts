import { Component, OnDestroy, ViewChild } from '@angular/core';
import { SortingService } from './services/sorting.service';
import { Subscription } from 'rxjs';
import { ArrayToBeSortedComponent } from './components/array-to-be-sorted/array-to-be-sorted.component';
import { ISortingStrategy } from './models/ISortingStrategy';
import { BubbleSort } from './sorting-algorithms/bubble-sort';
import { SelectionSort } from './sorting-algorithms/selection-sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  @ViewChild(ArrayToBeSortedComponent, { static: false }) arrayComponent: ArrayToBeSortedComponent;
  title = 'sorting-algorithms';

  private _currentSortingStrategy: ISortingStrategy;

  get currentSortingStrategy() {
    return this._currentSortingStrategy;
  }

  set currentSortingStrategy(sortingStrategy: ISortingStrategy) {
    this._currentSortingStrategy = sortingStrategy;
    this.sortingService.sortingStrategy = sortingStrategy;
  }

  sortingStrategies: ISortingStrategy[] = [new BubbleSort(), new SelectionSort()];

  sortingInProgress: boolean = false;
  
  // subscriptions: Subscription[];

  constructor(private sortingService: SortingService) { 
    // this.subscriptions = [];
    this.currentSortingStrategy = this.sortingStrategies[0];
    // this.subscriptions.push(this.sortingService.$sortingStrategyChange.subscribe((strategy) => {
    //   this.currentSortingStrategy = strategy;
    // }));
  }

  async sort() {
    if (this.sortingInProgress) {
      return;
    }
    this.sortingInProgress = true;
    await this.arrayComponent.sort(true);
    this.sortingInProgress = false;
  }

  ngOnDestroy() {
    // this.subscriptions.forEach(x => x.unsubscribe());
  }
}

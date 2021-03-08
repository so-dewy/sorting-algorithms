import { Component, OnInit, ViewChild } from '@angular/core';
import { SortingService } from '../../../services/sorting.service';
import { Subscription } from 'rxjs';
import { ArrayToBeSortedComponent } from '../array-to-be-sorted/array-to-be-sorted.component';
import { ISortingStrategy } from '../../../models/ISortingStrategy';
import { BubbleSort } from '../../../sorting-algorithms/BubbleSort';
import { SelectionSort } from '../../../sorting-algorithms/SelectionSort';
import { HeapSort } from 'src/app/sorting-algorithms/HeapSort';

@Component({
  selector: 'app-sorting-visualisation',
  templateUrl: './sorting-visualisation.component.html',
  styleUrls: ['./sorting-visualisation.component.css']
})
export class SortingVisualisationComponent implements OnInit {
  @ViewChild(ArrayToBeSortedComponent, { static: false }) arrayComponent: ArrayToBeSortedComponent;
  private _currentSortingStrategy: ISortingStrategy;

  get currentSortingStrategy() {
    return this._currentSortingStrategy;
  }

  set currentSortingStrategy(sortingStrategy: ISortingStrategy) {
    this._currentSortingStrategy = sortingStrategy;
    this.sortingService.sortingStrategy = sortingStrategy;
  }

  sortingStrategies: ISortingStrategy[] = [new BubbleSort(), new SelectionSort(),new HeapSort(), ];

  sortingInProgress: boolean = false;
  
  // subscriptions: Subscription[];

  constructor(private sortingService: SortingService) { 
    // this.subscriptions = [];
    this.currentSortingStrategy = this.sortingStrategies[0];
    // this.subscriptions.push(this.sortingService.$sortingStrategyChange.subscribe((strategy) => {
    //   this.currentSortingStrategy = strategy;
    // }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // this.subscriptions.forEach(x => x.unsubscribe());
  }  

  async sort() {
    if (this.sortingInProgress) {
      return;
    }
    this.sortingInProgress = true;
    await this.arrayComponent.sort(true);
    this.sortingInProgress = false;
  }
}

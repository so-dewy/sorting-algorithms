import { Component, OnDestroy, ViewChild } from '@angular/core';
import { SortingService } from './services/sorting.service';
import { Subscription } from 'rxjs';
import { ArrayToBeSortedComponent } from './components/array-to-be-sorted/array-to-be-sorted.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  @ViewChild(ArrayToBeSortedComponent, { static: false }) arrayComponent: ArrayToBeSortedComponent;
  title = 'sorting-algorithms';
  currentSortingStrategy: string;
  
  subscriptions: Subscription[];
  constructor(private sortingService: SortingService) { 
    this.subscriptions = [];
    this.subscriptions.push(this.sortingService.$sortingStrategyChange.subscribe((strategy) => {
      this.currentSortingStrategy = strategy;
    }));
  }

  sort() {
    this.arrayComponent.sort();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}

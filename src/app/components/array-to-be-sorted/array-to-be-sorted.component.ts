import { Component, OnInit } from '@angular/core';
import { SortingService } from 'src/app/services/sorting.service';
import { SelectionSort } from 'src/app/sorting-algorithms/selection-sort';

@Component({
  selector: 'array-to-be-sorted',
  templateUrl: './array-to-be-sorted.component.html',
  styleUrls: ['./array-to-be-sorted.component.css']
})
export class ArrayToBeSortedComponent implements OnInit {

  arrayToSort: number[];
  indexesToHighlight: number[];

  constructor(private sortingService: SortingService) { }

  ngOnInit(): void {
    this.fillArrayWithRandomValues(50);
    this.sortingService.sortingStrategy = new SelectionSort();
    this.sortingService.sortingStrategy.delay = 100;
    // this.sort();
  }

  shouldBeHighlighted(element: number): boolean {
    return this.indexesToHighlight && this.indexesToHighlight.find(el => el == element) != undefined;
  }

  async sort() {
    const generator = this.sortingService.sort(this.arrayToSort, (x, y) => x - y);
    for await (let value of generator) { 
      this.indexesToHighlight = value; 
    }
    this.indexesToHighlight = null;
  }

  fillArrayWithRandomValues(length: number) {
    this.arrayToSort = [];
    for (let i = 0; i < length; i++) {
      this.arrayToSort.push(Math.random() * 100);
    }
  }

}

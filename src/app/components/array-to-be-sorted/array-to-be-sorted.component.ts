import { Component, OnInit } from '@angular/core';
import { SortingService } from 'src/app/services/sorting.service';

@Component({
  selector: 'array-to-be-sorted',
  templateUrl: './array-to-be-sorted.component.html',
  styleUrls: ['./array-to-be-sorted.component.css']
})
export class ArrayToBeSortedComponent implements OnInit {

  arrayToSort: number[];

  constructor(private sortingService: SortingService) { }

  ngOnInit(): void {
    this.fillArrayWithRandomValues(100);
    this.sortingService.sort(this.arrayToSort, (x, y) => x - y);
  }

  fillArrayWithRandomValues(length: number) {
    this.arrayToSort = [];
    for (let i = 0; i < length; i++) {
      this.arrayToSort.push(Math.random() * 100);
    }
  }

}

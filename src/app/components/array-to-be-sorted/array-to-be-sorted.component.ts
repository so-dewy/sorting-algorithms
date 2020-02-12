import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'array-to-be-sorted',
  templateUrl: './array-to-be-sorted.component.html',
  styleUrls: ['./array-to-be-sorted.component.css']
})
export class ArrayToBeSortedComponent implements OnInit {

  arrayToSort: number[];

  constructor() { }

  ngOnInit(): void {
    this.fillArrayWithRandomValues(100);
    // setTimeout(() => {
    //   this.arrayToSort.sort((x, y) => x - y );
    // }, 2000);
  }

  fillArrayWithRandomValues(length: number) {
    this.arrayToSort = [];
    for (let i = 0; i < length; i++) {
      this.arrayToSort.push(Math.random() * 100);
    }
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'array-to-be-sorted',
  templateUrl: './array-to-be-sorted.component.html',
  styleUrls: ['./array-to-be-sorted.component.css']
})
export class ArrayToBeSortedComponent implements OnInit {

  arrayToSort = [11, -2, 3];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.arrayToSort.sort((x, y) => x - y );
    }, 2000);
  }

}

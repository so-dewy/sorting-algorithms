import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'element-of-array',
  templateUrl: './element-of-array.component.html',
  styleUrls: ['./element-of-array.component.css']
})
export class ElementOfArrayComponent implements OnInit {
  @Input() elementValue: number;
  constructor() { }

  ngOnInit(): void {
  }

}

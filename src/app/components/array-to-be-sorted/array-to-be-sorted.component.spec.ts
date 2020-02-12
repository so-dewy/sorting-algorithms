import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayToBeSortedComponent } from './array-to-be-sorted.component';

describe('ArrayToBeSortedComponent', () => {
  let component: ArrayToBeSortedComponent;
  let fixture: ComponentFixture<ArrayToBeSortedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayToBeSortedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayToBeSortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementOfArrayComponent } from './element-of-array.component';

describe('ElementOfArrayComponent', () => {
  let component: ElementOfArrayComponent;
  let fixture: ComponentFixture<ElementOfArrayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementOfArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementOfArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

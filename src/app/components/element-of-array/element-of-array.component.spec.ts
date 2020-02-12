import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementOfArrayComponent } from './element-of-array.component';

describe('ElementOfArrayComponent', () => {
  let component: ElementOfArrayComponent;
  let fixture: ComponentFixture<ElementOfArrayComponent>;

  beforeEach(async(() => {
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

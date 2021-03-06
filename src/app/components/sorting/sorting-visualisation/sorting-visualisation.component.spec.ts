import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingVisualisationComponent } from './sorting-visualisation.component';

describe('SortingVisualisationComponent', () => {
  let component: SortingVisualisationComponent;
  let fixture: ComponentFixture<SortingVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

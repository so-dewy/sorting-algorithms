/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RasterizerComponent } from './rasterizer.component';

describe('RasterizerComponent', () => {
  let component: RasterizerComponent;
  let fixture: ComponentFixture<RasterizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasterizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasterizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

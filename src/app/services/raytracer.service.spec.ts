/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RaytracerService } from './raytracer.service';

describe('Service: Raytracer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaytracerService]
    });
  });

  it('should ...', inject([RaytracerService], (service: RaytracerService) => {
    expect(service).toBeTruthy();
  }));
});

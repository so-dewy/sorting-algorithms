/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LinearAlgebraService } from './linear-algebra.service';

describe('Service: LinearAlgebra', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinearAlgebraService]
    });
  });

  it('should ...', inject([LinearAlgebraService], (service: LinearAlgebraService) => {
    expect(service).toBeTruthy();
  }));
});

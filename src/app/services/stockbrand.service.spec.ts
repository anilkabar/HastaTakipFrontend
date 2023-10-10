import { TestBed } from '@angular/core/testing';

import { StockbrandService } from './stockbrand.service';

describe('StockbrandService', () => {
  let service: StockbrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockbrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

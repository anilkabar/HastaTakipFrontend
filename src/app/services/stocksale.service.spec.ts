import { TestBed } from '@angular/core/testing';

import { StocksaleService } from './stocksale.service';

describe('StocksaleService', () => {
  let service: StocksaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocksaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

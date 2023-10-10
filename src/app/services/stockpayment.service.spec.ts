import { TestBed } from '@angular/core/testing';

import { StockpaymentService } from './stockpayment.service';

describe('StockpaymentService', () => {
  let service: StockpaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockpaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

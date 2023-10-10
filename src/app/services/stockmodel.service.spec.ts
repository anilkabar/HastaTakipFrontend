import { TestBed } from '@angular/core/testing';

import { StockmodelserviceService } from './stockmodel.service';

describe('StockmodelserviceService', () => {
  let service: StockmodelserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockmodelserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

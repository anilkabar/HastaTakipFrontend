import { TestBed } from '@angular/core/testing';

import { DynamicdialogService } from './dynamicdialog.service';

describe('DynamicdialogService', () => {
  let service: DynamicdialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicdialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

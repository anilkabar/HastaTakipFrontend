import { TestBed } from '@angular/core/testing';

import { PageadminService } from './pageadmin.service';

describe('PageadminService', () => {
  let service: PageadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

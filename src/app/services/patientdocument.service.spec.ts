import { TestBed } from '@angular/core/testing';

import { PatientdocumentService } from './patientdocument.service';

describe('PatientdocumentService', () => {
  let service: PatientdocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientdocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

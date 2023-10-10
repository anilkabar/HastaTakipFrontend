import { TestBed } from '@angular/core/testing';

import { PatientexaminationService } from './patientexamination.service';

describe('PatientexaminationService', () => {
  let service: PatientexaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientexaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

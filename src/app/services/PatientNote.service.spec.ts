/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatientNoteService } from './PatientNote.service';

describe('Service: PatientNote', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientNoteService]
    });
  });

  it('should ...', inject([PatientNoteService], (service: PatientNoteService) => {
    expect(service).toBeTruthy();
  }));
});

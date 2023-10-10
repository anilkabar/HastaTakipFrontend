import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientdocumentComponent } from './patientdocument.component';

describe('PatientdocumentComponent', () => {
  let component: PatientdocumentComponent;
  let fixture: ComponentFixture<PatientdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientdocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientexaminationComponent } from './patientexamination.component';

describe('PatientexaminationComponent', () => {
  let component: PatientexaminationComponent;
  let fixture: ComponentFixture<PatientexaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientexaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientexaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

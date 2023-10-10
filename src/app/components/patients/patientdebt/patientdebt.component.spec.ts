import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientdebtComponent } from './patientdebt.component';

describe('PatientdebtComponent', () => {
  let component: PatientdebtComponent;
  let fixture: ComponentFixture<PatientdebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientdebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientdebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

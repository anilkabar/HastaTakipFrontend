import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientdeptorallComponent } from './patientdeptorall.component';

describe('PatientdeptorallComponent', () => {
  let component: PatientdeptorallComponent;
  let fixture: ComponentFixture<PatientdeptorallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientdeptorallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientdeptorallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

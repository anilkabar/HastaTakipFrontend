import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceoperationsComponent } from './deviceoperations.component';

describe('DeviceoperationsComponent', () => {
  let component: DeviceoperationsComponent;
  let fixture: ComponentFixture<DeviceoperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceoperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceoperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

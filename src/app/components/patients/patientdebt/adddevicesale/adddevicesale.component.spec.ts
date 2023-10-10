import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddevicesaleComponent } from './adddevicesale.component';

describe('AdddevicesaleComponent', () => {
  let component: AdddevicesaleComponent;
  let fixture: ComponentFixture<AdddevicesaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddevicesaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddevicesaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

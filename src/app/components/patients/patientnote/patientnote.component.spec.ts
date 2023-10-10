import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientnoteComponent } from './patientnote.component';

describe('PatientnoteComponent', () => {
  let component: PatientnoteComponent;
  let fixture: ComponentFixture<PatientnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

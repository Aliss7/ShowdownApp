import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextfourComponent } from './nextfour.component';

describe('NextfourComponent', () => {
  let component: NextfourComponent;
  let fixture: ComponentFixture<NextfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextfourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

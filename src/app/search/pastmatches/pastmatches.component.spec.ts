import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastmatchesComponent } from './pastmatches.component';

describe('PastmatchesComponent', () => {
  let component: PastmatchesComponent;
  let fixture: ComponentFixture<PastmatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastmatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastmatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

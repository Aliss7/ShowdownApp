import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RivalstatComponent } from './rivalstat.component';

describe('RivalstatComponent', () => {
  let component: RivalstatComponent;
  let fixture: ComponentFixture<RivalstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RivalstatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RivalstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

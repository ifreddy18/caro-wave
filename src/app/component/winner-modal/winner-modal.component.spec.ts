import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerModalComponent } from './winner-modal.component';

describe('WinnerModalComponent', () => {
  let component: WinnerModalComponent;
  let fixture: ComponentFixture<WinnerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

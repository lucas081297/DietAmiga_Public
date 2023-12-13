import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanchetardeComponent } from './lanchetarde.component';

describe('LanchetardeComponent', () => {
  let component: LanchetardeComponent;
  let fixture: ComponentFixture<LanchetardeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanchetardeComponent]
    });
    fixture = TestBed.createComponent(LanchetardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

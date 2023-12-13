import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafemanhaComponent } from './cafemanha.component';

describe('CafemanhaComponent', () => {
  let component: CafemanhaComponent;
  let fixture: ComponentFixture<CafemanhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CafemanhaComponent]
    });
    fixture = TestBed.createComponent(CafemanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

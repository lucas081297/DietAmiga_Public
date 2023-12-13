import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmocoComponent } from './almoco.component';

describe('AlmocoComponent', () => {
  let component: AlmocoComponent;
  let fixture: ComponentFixture<AlmocoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmocoComponent]
    });
    fixture = TestBed.createComponent(AlmocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

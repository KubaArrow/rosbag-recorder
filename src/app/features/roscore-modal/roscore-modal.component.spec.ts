import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoscoreModalComponent } from './roscore-modal.component';

describe('RoscoreModalComponent', () => {
  let component: RoscoreModalComponent;
  let fixture: ComponentFixture<RoscoreModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoscoreModalComponent]
    });
    fixture = TestBed.createComponent(RoscoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorderModalComponent } from './recorder-modal.component';

describe('RecorderModalComponent', () => {
  let component: RecorderModalComponent;
  let fixture: ComponentFixture<RecorderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecorderModalComponent]
    });
    fixture = TestBed.createComponent(RecorderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

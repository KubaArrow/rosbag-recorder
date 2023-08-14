import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordModalComponent } from './record-modal.component';

describe('RecordModalComponent', () => {
  let component: RecordModalComponent;
  let fixture: ComponentFixture<RecordModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordModalComponent]
    });
    fixture = TestBed.createComponent(RecordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

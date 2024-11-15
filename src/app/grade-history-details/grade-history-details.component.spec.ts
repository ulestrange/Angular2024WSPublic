import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeHistoryDetailsComponent } from './grade-history-details.component';

describe('GradeHistoryDetailsComponent', () => {
  let component: GradeHistoryDetailsComponent;
  let fixture: ComponentFixture<GradeHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeHistoryDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

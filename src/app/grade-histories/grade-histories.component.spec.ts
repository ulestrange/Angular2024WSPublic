import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeHistoriesComponent } from './grade-histories.component';

describe('GradeHistoriesComponent', () => {
  let component: GradeHistoriesComponent;
  let fixture: ComponentFixture<GradeHistoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeHistoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

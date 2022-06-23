import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentScoreComponent } from './view-student-score.component';

describe('ViewStudentScoreComponent', () => {
  let component: ViewStudentScoreComponent;
  let fixture: ComponentFixture<ViewStudentScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

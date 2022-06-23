import { ScoreService } from './score.service';
import { KEY_CODE, GradeData, ScoreData } from '../Models/student-grade';
import { Component, OnInit, HostListener } from '@angular/core';
import { GradeService } from './grade.service';

@Component({
  selector: 'app-view-student-score',
  templateUrl: './view-student-score.component.html',
  styleUrls: ['./view-student-score.component.css']
})
export class ViewStudentScoreComponent implements OnInit {

  disableNext: boolean = false;
  disablePrev: boolean = true;
  allGradeData: GradeData[] = [];
  selectedSubScore: ScoreData[] = [];
  allSubjectIds: number[] = []
  selectedSubIds: number[] = []
  displayedColumns: string[] = ['gradeName', 'subjectName', 'score'];
  isSelected(id: number): boolean {
    return this.selectedSubIds.includes(id);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == KEY_CODE.LEFT_ARROW) {
      this.previous();
    }
    if (event.keyCode == KEY_CODE.RIGHT_ARROW) {
      this.next();
    }
  }

  ngOnInit(): void {

    this.gradeService.getGrades().subscribe({
      next: grades => {
        this.allGradeData = grades;

        this.allGradeData.forEach(grades => {
          grades.subjects.forEach(sub => {
            this.allSubjectIds.push(sub.id);
          });
        });

        var first3SubIds = this.allSubjectIds.slice(0, 3);
        this.selectedSubIds.push(...first3SubIds);

        this.getScores();
      },
      error: err => console.log(err)
    });;
  }
  constructor(private scoreService: ScoreService, private gradeService: GradeService) { }

  previous() {
    var firstindex = this.allSubjectIds.indexOf(this.selectedSubIds[0]);
    this.disablePrev = false;
    this.disableNext = false;
    
    if (firstindex == 1 || firstindex == 0) {
      this.disableNext = false;
      this.disablePrev = true;
    }

    if (firstindex != 0) {
      var startIndex = firstindex - 1;
      var endIndex = firstindex + 2;
      this.selectedSubIds = [];

      var next3SubIds = this.allSubjectIds.slice(startIndex, endIndex);
      this.selectedSubIds.push(...next3SubIds);
      this.getScores();
    }
  }

  next() {
    var firstindex = this.allSubjectIds.indexOf(this.selectedSubIds[0]);
    var lastindex = this.allSubjectIds.indexOf(this.selectedSubIds[2]);
    var subjectLastindex = this.allSubjectIds.indexOf(this.allSubjectIds.length - 1);

    this.disablePrev = false;
    this.disableNext = false;
    
    if (this.allSubjectIds[lastindex] >= this.allSubjectIds[subjectLastindex]) {
      this.disableNext = true;
      this.disablePrev = false;
    }

    if (this.allSubjectIds[lastindex] <= this.allSubjectIds[subjectLastindex]) {
      this.selectedSubIds = [];
      var next3SubIds = this.allSubjectIds.slice(firstindex + 1, firstindex + 4);
      this.selectedSubIds.push(...next3SubIds);
      this.getScores();
    }
  }

  getScores() {

    this.scoreService.getAllScores(this.selectedSubIds).subscribe({
      next: subScore => {
        this.selectedSubScore = subScore;
      },
      error: err => console.log(err)
    });
  }
}

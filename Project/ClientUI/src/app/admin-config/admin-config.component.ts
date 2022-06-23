import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImportConfigService } from './import-config.service';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.css']
})
export class AdminConfigComponent implements OnInit {
  csvMessage = '';
  jsonMessage = '';

  @ViewChild('myGInput')
  myGradeInputVariable!: ElementRef;
  
  @ViewChild('mySInput')
  myScoreInputVariable!: ElementRef;

  constructor(private configService: ImportConfigService) { }

  ngOnInit(): void {
  }

  onJsonFileSelected(event: any) {

    const selectedFile: File = event.target.files[0];

    if (selectedFile) {
      this.configService.importGrades(selectedFile).subscribe({
        next: subScore => {
          this.myGradeInputVariable.nativeElement.value = "";
          this.jsonMessage = "successfully uploaded";
        },
        error: err => this.jsonMessage = "Upload failed"
      });
    }
  }

  onCsvFileSelected(event: any) {

    const selectedFile: File = event.target.files[0];

    if (selectedFile) {
      this.configService.importScores(selectedFile).subscribe({
        next: subScore => {
          this.myScoreInputVariable.nativeElement.value = "";
          this.csvMessage = "successfully uploaded";
        },
        error: err => this.csvMessage = "Upload failed"
      });
    }
  }
}
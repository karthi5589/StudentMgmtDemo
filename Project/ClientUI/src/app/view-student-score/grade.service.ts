import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { GradeData } from '../Models/student-grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private gradeUrl = 'http://localhost:5000/api/School/GetAllGradesAndSubjects';

  constructor(private http: HttpClient) { }

  public getGrades(): Observable<GradeData[]> {
    return this.http.get<GradeData[]>(this.gradeUrl)
      .pipe(catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

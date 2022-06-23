import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ScoreData } from '../Models/student-grade';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private scoreUrl = 'http://localhost:5000/api/Student/GetStudentScores';

  constructor(private http: HttpClient) { }

  public getAllScores(selectedIds: number[]): Observable<ScoreData[]> {
    let params = new HttpParams()
    let iteration = 0;

    console.log(selectedIds);

    selectedIds.forEach(id => {
      params = params.append(`selectedSubIds[${iteration}]`, id.toString());
      iteration++;
    });


    return this.http.get<ScoreData[]>(this.scoreUrl, { params })
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

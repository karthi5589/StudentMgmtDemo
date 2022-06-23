import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportConfigService {

  private importGradeUrl = 'http://localhost:5000/api/Admin/ImportGrades';
  private importScoreUrl = 'http://localhost:5000/api/Admin/ImportScores';

  constructor(private http: HttpClient) { }

  public importGrades(fileToUpload: File): Observable<boolean> {

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<any>(this.importGradeUrl, formData).pipe(catchError(this.handleError)
    );
  }

  public importScores(fileToUpload: File): Observable<boolean> {

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<any>(this.importScoreUrl, formData).pipe(catchError(this.handleError)
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
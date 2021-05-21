import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionFormationModel } from '../models/sessionFormation.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SessionFormationService {
  private baseURL = 'http://localhost:9999/Sessionformation';
  sessionFormationForm: FormGroup;
  sessionFormation: SessionFormationModel = new SessionFormationModel();
  constructor(private httpClient: HttpClient) {}

  getAllSessionFormation(): Observable<SessionFormationModel[]> {
    return this.httpClient
      .get<SessionFormationModel[]>(`${this.baseURL}`)
      .pipe(catchError(this.errorHandler));
  }

  createSessionFormation(
    sessionFormation: SessionFormationModel
  ): Observable<SessionFormationModel> {
    return this.httpClient
      .post<SessionFormationModel>(`${this.baseURL}`, sessionFormation)
      .pipe(catchError(this.errorHandler));
  }

  getSessionFormationById(id: number): Observable<SessionFormationModel> {
    return this.httpClient
      .get<SessionFormationModel>(`${this.baseURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updateSessionFormation(
    id: number,
    sessionFormation: SessionFormationModel
  ): Observable<SessionFormationModel> {
    console.log(id);
    return this.httpClient
      .put<SessionFormationModel>(`${this.baseURL}/${id}`, sessionFormation)
      .pipe(catchError(this.errorHandler));
  }

  deleteSessionFormation(id: number): Observable<Object> {
    console.log(id);
    return this.httpClient
      .delete(`${this.baseURL}/${id}`, { responseType: 'text' })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

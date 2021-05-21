import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormationModel } from '../models/formation.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  private baseURL = 'http://localhost:9999/formation';
  formationForm: FormGroup;
  formation: FormationModel = new FormationModel();
  constructor(private httpClient: HttpClient) {}

  getAllFormation(): Observable<FormationModel[]> {
    return this.httpClient
      .get<FormationModel[]>(`${this.baseURL}`)
      .pipe(catchError(this.errorHandler));
  }

  createFormation(formation: FormationModel): Observable<FormationModel> {
    return this.httpClient
      .post<FormationModel>(`${this.baseURL}`, formation)
      .pipe(catchError(this.errorHandler));
  }

  getFormationById(id: number): Observable<FormationModel> {
    return this.httpClient
      .get<FormationModel>(`${this.baseURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updateFormation(
    id: number,
    formation: FormationModel
  ): Observable<FormationModel> {
    console.log(id);
    return this.httpClient
      .put<FormationModel>(`${this.baseURL}/${id}`, formation)
      .pipe(catchError(this.errorHandler));
  }

  deleteFormation(id: number): Observable<Object> {
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

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormateurModel } from '../models/formateur.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class FormateurService {
  private baseURL = 'http://localhost:9999/formateur';
  formateurForm: FormGroup;
  formateur: FormateurModel = new FormateurModel();
  constructor(private httpClient: HttpClient) {}

  getAllFormateur(): Observable<FormateurModel[]> {
    return this.httpClient
      .get<FormateurModel[]>(`${this.baseURL}`)
      .pipe(catchError(this.errorHandler));
  }

  createFormateur(formateur: FormateurModel): Observable<FormateurModel> {
    return this.httpClient
      .post<FormateurModel>(`${this.baseURL}`, formateur)
      .pipe(catchError(this.errorHandler));
  }

  getFormateurById(id: number): Observable<FormateurModel> {
    return this.httpClient
      .get<FormateurModel>(`${this.baseURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updateFormateur(
    id: number,
    formateur: FormateurModel
  ): Observable<FormateurModel> {
    console.log(id);
    return this.httpClient
      .put<FormateurModel>(`${this.baseURL}/${id}`, formateur)
      .pipe(catchError(this.errorHandler));
  }

  deleteFormateur(id: number): Observable<Object> {
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

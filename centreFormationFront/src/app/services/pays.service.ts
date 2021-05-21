import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaysModel } from '../models/pays.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PaysService {
  private baseURL = 'http://localhost:9999/pays';
  paysForm: FormGroup;
  pays: PaysModel = new PaysModel();
  constructor(private httpClient: HttpClient) {}

  getAllPays(): Observable<PaysModel[]> {
    return this.httpClient
      .get<PaysModel[]>(`${this.baseURL}`)
      .pipe(catchError(this.errorHandler));
  }

  createPays(pays: PaysModel): Observable<PaysModel> {
    return this.httpClient
      .post<PaysModel>(`${this.baseURL}`, pays)
      .pipe(catchError(this.errorHandler));
  }

  getPaysById(id: number): Observable<PaysModel> {
    return this.httpClient
      .get<PaysModel>(`${this.baseURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updatePays(id: number, pays: PaysModel): Observable<PaysModel> {
    console.log(id);
    return this.httpClient
      .put<PaysModel>(`${this.baseURL}/${id}`, pays)
      .pipe(catchError(this.errorHandler));
  }

  deletePays(id: number): Observable<Object> {
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

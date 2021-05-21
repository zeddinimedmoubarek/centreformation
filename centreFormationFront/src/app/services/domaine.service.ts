import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DomaineModel } from '../models/domaine.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DomaineService {
  private baseURL = 'http://localhost:9999/domaine';
  domaineForm: FormGroup;
  domaine: DomaineModel = new DomaineModel();
  constructor(private httpClient: HttpClient) {}

  getAllDomaine(): Observable<DomaineModel[]> {
    return this.httpClient
      .get<DomaineModel[]>(`${this.baseURL}`)
      .pipe(catchError(this.errorHandler));
  }

  createDomaine(domaine: DomaineModel): Observable<DomaineModel> {
    return this.httpClient
      .post<DomaineModel>(`${this.baseURL}`, domaine)
      .pipe(catchError(this.errorHandler));
  }

  getDomaineById(id: number): Observable<DomaineModel> {
    return this.httpClient
      .get<DomaineModel>(`${this.baseURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updateDomaine(id: number, domaine: DomaineModel): Observable<DomaineModel> {
    console.log(id);
    return this.httpClient
      .put<DomaineModel>(`${this.baseURL}/${id}`, domaine)
      .pipe(catchError(this.errorHandler));
  }

  deleteDomaine(id: number): Observable<Object> {
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

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrganismeModel } from '../models/organisme.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OrganismeService {
  private baseURL = 'http://localhost:9999/organisme';
  organismeForm: FormGroup;
  organisme: OrganismeModel = new OrganismeModel();
  constructor(private httpClient: HttpClient) {}

  getAllOrganisme(): Observable<OrganismeModel[]> {
    return this.httpClient
      .get<OrganismeModel[]>(`${this.baseURL}`)
      .pipe(catchError(this.errorHandler));
  }

  createOrganisme(organisme: OrganismeModel): Observable<OrganismeModel> {
    return this.httpClient
      .post<OrganismeModel>(`${this.baseURL}`, organisme)
      .pipe(catchError(this.errorHandler));
  }

  getOrganismeById(id: number): Observable<OrganismeModel> {
    return this.httpClient
      .get<OrganismeModel>(`${this.baseURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updateOrganisme(
    id: number,
    organisme: OrganismeModel
  ): Observable<OrganismeModel> {
    console.log(id);
    return this.httpClient
      .put<OrganismeModel>(`${this.baseURL}/${id}`, organisme)
      .pipe(catchError(this.errorHandler));
  }

  deleteOrganisme(id: number): Observable<Object> {
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

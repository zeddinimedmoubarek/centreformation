import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfilModel } from '../models/profil.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private baseURL = 'http://localhost:9999/profil';
  profilForm: FormGroup;
  profil: ProfilModel = new ProfilModel();
  constructor(private httpClient: HttpClient) {}

  getAllProfil(): Observable<ProfilModel[]> {
    return this.httpClient
      .get<ProfilModel[]>(`${this.baseURL}`)
      .pipe(catchError(this.errorHandler));
  }

  createProfil(profil: ProfilModel): Observable<ProfilModel> {
    return this.httpClient
      .post<ProfilModel>(`${this.baseURL}`, profil)
      .pipe(catchError(this.errorHandler));
  }

  getProfilById(id: number): Observable<ProfilModel> {
    return this.httpClient
      .get<ProfilModel>(`${this.baseURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updateProfil(id: number, profil: ProfilModel): Observable<ProfilModel> {
    console.log(id);
    return this.httpClient
      .put<ProfilModel>(`${this.baseURL}/${id}`, profil)
      .pipe(catchError(this.errorHandler));
  }

  deleteProfil(id: number): Observable<Object> {
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

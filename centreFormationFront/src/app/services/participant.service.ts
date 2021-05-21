import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ParticipantModel } from '../models/participant.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private baseURL = 'http://localhost:9999/participant';
  participantForm: FormGroup;
  participant: ParticipantModel = new ParticipantModel();
  constructor(private httpClient: HttpClient) {}

  getAllParticipant(): Observable<ParticipantModel[]> {
    return this.httpClient
      .get<ParticipantModel[]>(`${this.baseURL}`)
      .pipe(catchError(this.errorHandler));
  }

  createParticipant(
    participant: ParticipantModel
  ): Observable<ParticipantModel> {
    return this.httpClient
      .post<ParticipantModel>(`${this.baseURL}`, participant)
      .pipe(catchError(this.errorHandler));
  }

  getParticipantById(id: number): Observable<ParticipantModel> {
    return this.httpClient
      .get<ParticipantModel>(`${this.baseURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updateParticipant(
    id: number,
    participant: ParticipantModel
  ): Observable<ParticipantModel> {
    console.log(id);
    return this.httpClient
      .put<ParticipantModel>(`${this.baseURL}/${id}`, participant)
      .pipe(catchError(this.errorHandler));
  }

  deleteParticipant(id: number): Observable<Object> {
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

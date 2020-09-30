import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Word } from '../models/Word';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getWords(): Observable<Word[]> {
    return this.http
      .get<Word[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError('getWords', [])));
  }

  getWordById(id: string): Observable<Word> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Word>(url)
      .pipe(catchError(this.handleError<Word>(`getWordById id=${id}`)));
  }

  addWord(word: Word): Observable<Word> {
    return this.http
      .post<Word>(this.apiUrl, word, this.httpOptions)
      .pipe(catchError(this.handleError<Word>('addWord')));
  }

  updateWord(id: string, word: Word): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .put(url, word, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateWord')));
  }

  deleteWord(id: string): Observable<Word> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete<Word>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Word>('deleteWord')));
  }
}

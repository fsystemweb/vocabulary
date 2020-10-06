import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Word } from '../models/Word';
import { vocabularyList } from '../data/vocabulary';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getWords(): Observable<Word[]> {
    const url = `${apiUrl}/words`;
    return this.http
      .get<Word[]>(url)
      .pipe(catchError(this.handleError<Word[]>(`getWords`)));
  }

  getWordById(id: string): Observable<Word> {
    const url = `${apiUrl}/words/${id}`;
    return this.http
      .get<Word>(url)
      .pipe(catchError(this.handleError<Word>(`getId`)));
  }

  addWord(word: Word): Observable<Word> {
    return this.http
      .post<Word>(`${apiUrl}/words`, word, httpOptions)
      .pipe(catchError(this.handleError<Word>('addWord')));
  }

  updateWord(id: string, word: Word): Observable<any> {
    return this.http
      .put<Word>(`${apiUrl}/words/${id}`, word, httpOptions)
      .pipe(catchError(this.handleError<Word>('updateWord')));
  }

  deleteWord(id: string): Observable<Word> {
    const url = `${apiUrl}/words/${id}`;
    return this.http
      .delete<Word>(url, httpOptions)
      .pipe(catchError(this.handleError<Word>('deleteWord')));
  }
}

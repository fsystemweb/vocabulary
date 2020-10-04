import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Word } from '../models/Word';
import { vocabularyList } from '../data/vocabulary';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  getWords(): Observable<Word[]> {
    return of(vocabularyList);
  }

  getWordById(id: string): Observable<Word> {
    const word: Word = vocabularyList.find((element) => element.id === id);
    return of(word);
  }

  addWord(word: Word): Observable<Word> {
    return of(new Word());
  }

  updateWord(id: string, word: Word): Observable<any> {
    return of(vocabularyList);
  }

  deleteWord(id: string): Observable<Word> {
    return of(new Word());
  }
}

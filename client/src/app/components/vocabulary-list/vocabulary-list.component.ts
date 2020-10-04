import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Word } from '../../models/Word';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss'],
})
export class VocabularyListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'pronunciation',
    'meaning',
    'updated',
    'created',
  ];
  data: Word[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getWords();
  }

  getWords() {
    this.api.getWords().subscribe(
      (res: any) => {
        this.data = res;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}

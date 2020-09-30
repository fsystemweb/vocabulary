import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ApiService } from '../../services/api.service';
import { Word } from '../../models/Word';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss'],
})
export class VocabularyListComponent implements OnInit {
  socket = io('http://localhost:4000');
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

    this.socket.on(
      'update-data',
      function (data: any) {
        this.getWords();
      }.bind(this)
    );
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

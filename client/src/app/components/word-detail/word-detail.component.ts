import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Word } from './../../models/Word';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss'],
})
export class WordDetailComponent implements OnInit {
  socket = io('http://localhost:4000');

  word: Word = {
    id: '',
    name: '',
    pronunciation: '',
    meaning: null,
    updated: null,
    created: null,
  };
  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getWordDetail(this.route.snapshot.params.id);

    this.socket.on(
      'update-data',
      function (data: any) {
        this.getWordDetail();
      }.bind(this)
    );
  }

  getWordDetail(id: string) {
    this.api.getWordById(id).subscribe((data: any) => {
      this.word = data;
      this.isLoadingResults = false;
    });
  }

  deleteWord(id: any) {
    this.isLoadingResults = true;
    this.api.deleteWord(id).subscribe(
      (res) => {
        this.isLoadingResults = false;
        this.router.navigate(['/']);
        this.socket.emit('updatedata', res);
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}

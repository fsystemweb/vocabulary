import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Word } from './../../models/Word';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss'],
})
export class WordDetailComponent implements OnInit {
  word: Word = {
    id: '',
    name: '',
    pronunciation: '',
    meaning: '',
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
  }

  getWordDetail(id: string) {
    this.api.getWordById(id).subscribe((data: any) => {
      this.word = data;
      console.log(data);
      this.isLoadingResults = false;
    });
  }

  deleteWord(id: any) {
    this.isLoadingResults = true;
    this.api.deleteWord(id).subscribe(
      (res) => {
        this.isLoadingResults = false;
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}

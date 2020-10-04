import { Component, OnInit } from '@angular/core';

import * as io from 'socket.io-client';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MyErrorStateMatcher } from '../../util/MyErrorStateMatcher';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.scss'],
})
export class EditWordComponent implements OnInit {
  socket = io('http://localhost:4000');

  wordForm: FormGroup;
  _id = '';
  id = '';
  name = '';
  pronunciation = '';
  meaning = '';
  updated: Date = null;
  created: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getWordById(this.route.snapshot.params.id);
    this.wordForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      pronunciation: [null, Validators.required],
      meaning: [null, Validators.required],
      updated: [null, Validators.required],
      created: [null, Validators.required],
    });
  }

  getWordById(id: any) {
    this.api.getWordById(id).subscribe((data: any) => {
      this._id = data.id;
      this.wordForm.setValue({
        id: data.id,
        name: data.name,
        pronunciation: data.pronunciation,
        meaning: data.meaning,
        updated: data.updated,
        created: data.created,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateWord(this._id, this.wordForm.value).subscribe(
      (res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.socket.emit('updatedata', res);
        this.router.navigate(['/word-details', id]);
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  wordDetails() {
    this.router.navigate(['/word-details', this._id]);
  }
}

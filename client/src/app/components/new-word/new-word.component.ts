import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MyErrorStateMatcher } from '../../util/MyErrorStateMatcher';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.scss'],
})
export class NewWordComponent implements OnInit {
  wordForm: FormGroup;
  name = '';
  pronunciation = '';
  meaning = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.wordForm = this.formBuilder.group({
      name: [null, Validators.required],
      pronunciation: [null, Validators.required],
      meaning: [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addWord(this.wordForm.value).subscribe(
      (res: any) => {
        this.isLoadingResults = false;
        this.router.navigate(['/']);
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}

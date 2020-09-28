import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditWordComponent } from './components/edit-word/edit-word.component';
import { NewWordComponent } from './components/new-word/new-word.component';
import { VocabularyListComponent } from './components/vocabulary-list/vocabulary-list.component';
import { WordDetailComponent } from './components/word-detail/word-detail.component';

const routes: Routes = [
  {
    path: 'list',
    component: VocabularyListComponent,
    data: { title: 'List of Words' },
  },
  {
    path: 'word-details/:id',
    component: WordDetailComponent,
    data: { title: 'Word Details' },
  },
  {
    path: 'new-word',
    component: NewWordComponent,
    data: { title: 'Add Word' },
  },
  {
    path: 'edit-word/:id',
    component: EditWordComponent,
    data: { title: 'Edit Word' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

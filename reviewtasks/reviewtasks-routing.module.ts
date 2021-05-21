import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewtasksPage } from './reviewtasks.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewtasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewtasksPageRoutingModule {}

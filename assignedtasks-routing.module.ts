import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedtasksPage } from './assignedtasks.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedtasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedtasksPageRoutingModule {}

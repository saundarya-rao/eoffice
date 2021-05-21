import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedtasksPageRoutingModule } from './assignedtasks-routing.module';

import { AssignedtasksPage } from './assignedtasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedtasksPageRoutingModule
  ],
  declarations: [AssignedtasksPage]
})
export class AssignedtasksPageModule {}

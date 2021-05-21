import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewtasksPageRoutingModule } from './reviewtasks-routing.module';

import { ReviewtasksPage } from './reviewtasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewtasksPageRoutingModule
  ],
  declarations: [ReviewtasksPage]
})
export class ReviewtasksPageModule {}

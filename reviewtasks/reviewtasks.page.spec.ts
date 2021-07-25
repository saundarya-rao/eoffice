import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewtasksPage } from './reviewtasks.page';

describe('ReviewtasksPage', () => {
  let component: ReviewtasksPage;
  let fixture: ComponentFixture<ReviewtasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewtasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewtasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

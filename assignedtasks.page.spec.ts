import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignedtasksPage } from './assignedtasks.page';

describe('AssignedtasksPage', () => {
  let component: AssignedtasksPage;
  let fixture: ComponentFixture<AssignedtasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedtasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedtasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

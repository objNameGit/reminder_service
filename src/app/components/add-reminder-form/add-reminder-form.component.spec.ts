import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReminderFormComponent } from './add-reminder-form.component';

describe('AddReminderFormComponent', () => {
  let component: AddReminderFormComponent;
  let fixture: ComponentFixture<AddReminderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReminderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReminderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

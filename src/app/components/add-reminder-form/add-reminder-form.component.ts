import { Component, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, NgForm, FormGroup } from '@angular/forms';

import { RemindersService } from '@src/app/services/reminder-service/reminders.service';
import { v4 as uuidv4 } from "uuid";
import { IReminderItem } from '@src/interfaces/IReminderItem';

@Component({
  selector: 'add-reminder-form',
  templateUrl: './add-reminder-form.component.html',
  styleUrls: ['./add-reminder-form.component.css']
})
export class AddReminderFormComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<AddReminderFormComponent>,
    readonly remindersService: RemindersService
    ) { }
  @Input() reminderList: IReminderItem[];

  public minDate: object = new Date();
  public reminderForm: FormGroup = new FormGroup({
    "title": new FormControl("", Validators.required),
    "date": new FormControl("", [
      Validators.required,
      this.userDateValidator,
    ]),
    "time": new FormControl("00:00", Validators.pattern("[0-9][0-9]:[0-9][0-9]")),
    "comment": new FormControl(""),
  });

  ngOnInit(): void {
  }

  userDateValidator(control: FormControl): { [s: string]: boolean } {
    const inputDate: number = +new Date(control.value);
    const curDate: number = +new Date(new Date().setHours(0, 0, 0, 0));

    if (inputDate < curDate) {
      return { "date": true }
    }

    return null;
  }

  submit() {
    const { title, comment, date, time } = this.reminderForm.value;
    const [hours, minutes] = time.split(":");
    const dateTime = new Date(date).setHours(hours, minutes);
    const reminder = {
      id: uuidv4(),
      date: dateTime,
      title,
      comment,
    }

    this.remindersService.state = [...this.remindersService.state, reminder];
    this.closeDialog();
  }

  closeDialog(): void {
    console.log('close')
    this.dialogRef.close(false)
  }

  getDateErrorMessage() {
    const errorRequired = this.reminderForm.controls.date.hasError('required');

    if (errorRequired) {
      return 'Поле дата не может быть пустым';
    }

    if (!errorRequired && this.reminderForm.controls.date.invalid) {
      return 'Дата не может быть меньше текущей';
    }

    return '';
  }
}

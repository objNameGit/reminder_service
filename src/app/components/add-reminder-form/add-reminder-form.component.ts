import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';

import { RemindersService } from '@src/app/services/reminders.service';
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'add-reminder-form',
  templateUrl: './add-reminder-form.component.html',
  styleUrls: ['./add-reminder-form.component.css']
})
export class AddReminderFormComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddReminderFormComponent>,
    private remindersService: RemindersService
  ) { }

  public minDate:object = new Date();
  public reminderForm: FormGroup = new FormGroup({
    "title": new FormControl("", Validators.required),
    "date": new FormControl("", [
      Validators.required,
      this.userDateValidator,
    ]),
    "time": new FormControl("00:00", Validators.pattern("[0-9][0-9]:[0-9][0-9]")),
    "subtitle": new FormControl(""),
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
    const { title, subtitle, date, time } = this.reminderForm.value;
    const [hours, minutes] = time.split(":");
    const dateTime = new Date().setHours(hours, minutes);
    const reminder = {
      id: uuidv4(),
      time: dateTime,
      title,
      subtitle,
    }

    console.log(this.reminderForm);
    this.remindersService.addReminder(reminder)
    // this.remindersService.test()
  }

  closeDialog(): void {
    console.log('close')
    this.dialogRef.close(false)
}

accept() {
    console.log('accept')
    this.dialogRef.close(true)
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

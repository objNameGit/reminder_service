import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, NgForm, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from "uuid";

import { RemindersService } from '@src/app/services/reminder-service/reminders.service';
import { IReminderItem } from '@src/interfaces/IReminderItem';
import { IFormValues } from '@src/interfaces/IFormValues'

import { FormAttributes } from "@src/app/classes/FormAttributes"


@Component({
  selector: 'add-reminder-form',
  templateUrl: './add-reminder-form.component.html',
  styleUrls: ['./add-reminder-form.component.css']
})
export class AddReminderFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private readonly dialogRef: MatDialogRef<AddReminderFormComponent>,
    readonly remindersService: RemindersService
    ) { }

  // Нельзя уносить в formValue, т.к. форма проверяет минимальное значение по этому параметру.
  // formValue.date будет изменена при редактировании, и валидация даты будет неверная.
  public minDate: object = new Date();

  public title: string = 'Новое напоминание!';
  public formAttr : FormAttributes;
  public formValue: IFormValues = {
    id: '',
    title: '',
    date: +this.minDate,
    time: '00:00',
    comment: '',
  }
  public reminderForm: FormGroup;

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    const isEditAction = this.data && 'editAction' in this.data;
    const needChangeFormAttr = this.data && 'formAttr' in this.data;

    if (isEditAction) {
      this.changeFormValues(this.data.editAction);
    }

    if (needChangeFormAttr) {
      this.formAttr = new FormAttributes(this.data.formAttr);
    } else {
      this.formAttr = new FormAttributes();
    }

    const formGroupObject = this.getFormGroupObject();

    this.reminderForm = new FormGroup(formGroupObject);
  }

  getFormGroupObject() {
    return {
      "title": new FormControl(this.formValue.title, Validators.required),
      "date": new FormControl(new Date(this.formValue.date), [
        Validators.required,
        this.userDateValidator,
      ]),
      "time": new FormControl(this.formValue.time, Validators.pattern("[0-9][0-9]:[0-9][0-9]")),
      "comment": new FormControl(this.formValue.comment),
    };
  }

  /**
   * Изменяет дефолтные значения формы.
   * @param {IReminderItem} param Компомненты напоминания.
   * @return undefined.
   */
  changeFormValues({id, title, date, comment }: IReminderItem) {
    const time = new Date(date).toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric',
    });

    this.formValue.id = id || this.formValue.id;
    this.formValue.title = title || this.formValue.title;
    this.formValue.comment = comment || this.formValue.comment;
    this.formValue.date = date || this.formValue.date;
    this.formValue.time = time || this.formValue.time;
  }

  changeFormAttributes({}) {

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
      id: this.formValue.id || uuidv4(),
      date: dateTime,
      title,
      comment,
    }

    // this.remindersService.state = [...this.remindersService.state, reminder];
    this.remindersService.addReminder(reminder);
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

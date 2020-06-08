import { Component, OnInit, Input } from '@angular/core';

import { RemindersService } from '@src/app/services/reminder-service/reminders.service';
import { FormAttributes } from '@src/app/classes/FormAttributes';
import { DialogService } from '@src/app/services/dialog-service/dialog.service';

import type { IReminderItem } from '@src/interfaces/IReminderItem';
import type { IFormAttributes } from '@src/interfaces/IFormAttributes';


@Component({
  selector: 'reminder-list-item',
  templateUrl: './reminder-list-item.component.html',
  styleUrls: ['./reminder-list-item.component.css']
})
export class ReminderListItemComponent implements OnInit {
  constructor(
    private remindersService: RemindersService,
    private dialogService: DialogService,
  ) { }

  @Input() reminder:IReminderItem;

  public isElemChecked: boolean = false;

  ngOnInit(): void {
    this.remindersService.checkedItemList$.subscribe((value) => {
      this.isElemChecked = this.reminder.id in value;
    });
  }

  toggleElem() {
    this.remindersService.toggleElem(this.reminder.id);
  }

  // isElemChecked(): boolean {
  //   return this.remindersService.isElemChecked(this.reminder.id);

  // }

  deleteReminder(): void {
    this.remindersService.deleteReminder(this.reminder.id);
  }

  openEditReminderForm() {
    const formAttr: IFormAttributes = {
      acceptButtonName: 'Сохранить',
      title: 'Редактирование'
    };
    const editFormAttr = new FormAttributes(formAttr);

    this.dialogService.openEditReminderForm(this.reminder, editFormAttr);
  }

  isOutdate() {
    return this.reminder.date < Date.now()
  }
}

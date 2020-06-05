import { Component, OnInit, Input } from '@angular/core';

import type { IReminderItem } from '@src/interfaces/IReminderItem';
import { RemindersService } from '@src/app/services/reminder-service/reminders.service';


@Component({
  selector: 'reminder-list-item',
  templateUrl: './reminder-list-item.component.html',
  styleUrls: ['./reminder-list-item.component.css']
})
export class ReminderListItemComponent implements OnInit {
  constructor(private remindersService: RemindersService) { }

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

}

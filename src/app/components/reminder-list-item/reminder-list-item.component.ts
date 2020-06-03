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

  ngOnInit(): void {
  }

  toggleElem(id) {
    this.remindersService.toggleElem(id);
  }

  isElemChecked(id) {
    this.remindersService.isElemChecked(id);
  }

}

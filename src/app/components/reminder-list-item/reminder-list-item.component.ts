import { Component, OnInit, Input } from '@angular/core';

import type { IReminderItem } from '@src/interfaces/IReminderItem';
import { RemindersService } from '@src/app/services/reminders.service';


@Component({
  selector: 'reminder-list-item',
  templateUrl: './reminder-list-item.component.html',
  styleUrls: ['./reminder-list-item.component.css']
})
export class ReminderListItemComponent implements OnInit {

  constructor(private remindersService: RemindersService) { }

  ngOnInit(): void {
  }

  @Input() reminder:IReminderItem;

}

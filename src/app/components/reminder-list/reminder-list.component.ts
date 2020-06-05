import { Component, OnInit } from '@angular/core';

import { IReminderItem } from '@src/interfaces/IReminderItem';
import { RemindersService } from '@src/app/services/reminder-service/reminders.service';

@Component({
  selector: 'reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit {
  constructor( readonly remindersService: RemindersService) { }

  isListEmpty: boolean = true

  ngOnInit() {
    this.remindersService.state$.subscribe((newReminderList) => {
      this.isListEmpty = !newReminderList.length;
    });      
  }

  // getReminderList(): void {
  //   this.remindersService.getData()
  //     .subscribe(reminderList => {
  //       this.reminderList = reminderList;
  //     })
  // }

  // Удалить после того, как заработает апи
  // getStubReminderList(): void {
  //   this.remindersService.getData()
  //     .subscribe(reminderList => {
  //       console.log('test = ',reminderList);
  //       this.reminderList = reminderList
  //     })
  // }
}

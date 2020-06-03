import { Component } from '@angular/core';
import { RemindersService } from './services/reminders.service';
import { IReminderItem } from '@src/interfaces/IReminderItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  reminderList: IReminderItem[];
  userId: string;

  constructor(private remindersService: RemindersService) { }
  
  ngOnInit() {
    this.getReminderList()
    // this.getUserId();
  }

  getReminderList(): void {
    this.remindersService.getData()
      .subscribe(reminderList => {
        this.reminderList = reminderList
      })
  }

  getUserId(): void {
    this.remindersService.getUserId()
      .subscribe(obj => this.userId = obj.id);
  };

  title = 'reminder-app-final';
}

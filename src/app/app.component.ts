import { Component } from '@angular/core';
import { RemindersService } from './services/reminders.service';
import { IReminderItem } from '@src/interfaces/IReminderItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private remindersService: RemindersService) { }

  private userId: string;
  public title = 'Сервис напоминаний';

  ngOnInit() {
  }

  getUserId(): void {
    this.remindersService.getUserId()
      .subscribe(obj => this.userId = obj.id);
  };

  toggleAll(event) {
    return this.remindersService.toggleAll(event);
  }

  hasCheckedElem() {
    return this.remindersService.hasCheckedElem();

  }

  deleteSelected() {
    return this.remindersService.deleteSelected()
  }

  openCreateReminderForm() {

  }

}

import { Component } from '@angular/core';
import { RemindersService } from './services/reminder-service/reminders.service';
import { DialogService } from './services/dialog-service/dialog.service';
import { IReminderItem } from '@src/interfaces/IReminderItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DialogService, RemindersService]
})
export class AppComponent {
  constructor(
    private remindersService: RemindersService,
    private dialogService: DialogService,
  ) { }

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

  openAddReminderForm() {
    this.dialogService.openAddReminderForm()
    .afterClosed().subscribe(res => {
        if (res) {
            // this.remindersService.addReminder({});
        }
        console.log(res)
    });
  }

}

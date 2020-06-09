import { Component } from '@angular/core';
import { RemindersService } from './services/reminder-service/reminders.service';
import { DialogService } from './services/dialog-service/dialog.service';
import { IReminderItem } from '@src/interfaces/IReminderItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    readonly remindersService: RemindersService,
    private dialogService: DialogService,
  ) { }

  private userId: string;
  public title = 'Сервис напоминаний';
  public hasCheckedElem: boolean = false;
  public isChecked = false

  ngOnInit() {
    // this.remindersService.isIndeterminateActive$.subscribe((value) => {
    //   console.log ('isIndeterminate = ', value)
    //   this.isIndeterminate = value;
    // });
    this.remindersService.stubAddUserToStorage();

    this.remindersService.checkedItemList$.subscribe((value) => {
      const length = Object.keys(value).length;

      this.hasCheckedElem = !!length;
    });

    this.remindersService.setTimerToAll();
  }

  ngOnDesroy() {
    this.remindersService.clearTimerToAll();
  }

  getUserId(): void {
    this.remindersService.getUserId()
      .subscribe(obj => this.userId = obj.id);
  };

  toggleAll(event) {
    return this.remindersService.toggleAll(event);
  }

  unselectedAll() {
    return this.remindersService.unselectedAll();
  }

  isCheckedActive() {
    return this.remindersService.isCheckedActive();
  }

  deleteSelected() {
    return this.remindersService.deleteSelected()
  }

  openAddReminderForm() {
    this.dialogService.openAddReminderForm();
  }
}

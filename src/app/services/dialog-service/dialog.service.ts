import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

// import { ConfirmDialogComponent } from '@src/app/components/confirm-dialog/confirm-dialog.component';
import { AddReminderFormComponent } from '@src/app/components/add-reminder-form/add-reminder-form.component';
import { IReminderItem } from '@src/interfaces/IReminderItem';
import { IFormAttributes } from '@src/interfaces/IFormAttributes';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }
  
  // openConfirmDialog(msg: string) {
  //   return this.dialog.open(ConfirmDialogComponent, {
  //     width: '390px',
  //     panelClass: 'confirm-dialog-container',
  //     disableClose: true,
  //     position: { top: "10px" },
  //     data: {
  //       message: msg,
  //     }
  //   });
  // }

  openAddReminderForm() {
    return this.dialog.open(AddReminderFormComponent, {
      width: '390px',
      panelClass: 'add-dialog-container',
      disableClose: true,
      position: { top: "10px" },
    });
  }

  openEditReminderForm(reminder: IReminderItem, formAttr?: IFormAttributes) {
    console.log ('dialog_service reminder = ', reminder)
    console.log ('dialog_service formAttr = ', formAttr)
    const data = {
      editAction: reminder,
      formAttr
    };

    return this.dialog.open(AddReminderFormComponent, {
      width: '390px',
      panelClass: 'add-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data,
    });
  }
}

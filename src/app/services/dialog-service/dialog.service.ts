import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

// import { ConfirmDialogComponent } from '@src/app/components/confirm-dialog/confirm-dialog.component';
import { AddReminderFormComponent } from '@src/app/components/add-reminder-form/add-reminder-form.component';


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
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
    });
  }
}

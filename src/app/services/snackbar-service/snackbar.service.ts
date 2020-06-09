import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import { IReminderItem } from '@src/interfaces/IReminderItem';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  openSnackBar(reminder: IReminderItem, action: string) {
    const audio = new Audio();
    const msg = `Напоминание: ${reminder.title}.\n${reminder.comment}`;

    audio.preload = 'auto';
    audio.src = 'https://noisefx.ru/noise_base/04/02036.mp3';
    audio.play();

    let snackBar = this._snackBar.open(msg, action, {
      duration: 6000,
    });

    snackBar.afterDismissed().subscribe((obj) => {
        audio.pause();
    });
  }
}

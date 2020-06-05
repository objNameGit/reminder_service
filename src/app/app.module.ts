import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http'
import { registerLocaleData, CommonModule } from '@angular/common';

import localeRu from '@angular/common/locales/ru';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReminderListComponent } from './components/reminder-list/reminder-list.component';
import { ReminderListItemComponent } from './components/reminder-list-item/reminder-list-item.component';
import { AddReminderFormComponent } from './components/add-reminder-form/add-reminder-form.component';
import { MaterialModule } from './material-module';
import { MatButtonModule } from '@angular/material/button';
import { RemindersService } from "./services/reminder-service/reminders.service"


registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    ReminderListComponent,
    ReminderListItemComponent,
    AddReminderFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ru'}, { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

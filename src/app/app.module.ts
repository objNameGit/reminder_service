import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReminderListComponent } from './components/reminder-list/reminder-list.component';
import { ReminderListItemComponent } from './components/reminder-list-item/reminder-list-item.component';
import { MaterialModule } from './material-module';


registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    ReminderListComponent,
    ReminderListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MaterialModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ru'}, { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

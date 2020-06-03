import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

import { IReminderItem } from '@src/interfaces/IReminderItem';
import { IAutorizationData } from '@src/interfaces/IAutorizationData';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  constructor(
    private http: HttpClient,
    
  ) { }

  private baseUrl = 'https://europe-west1-st-testcase.cloudfunctions.net';
  private authUrl = `${this.baseUrl}/api/auth`;
  private myStorage = localStorage;

  getUserId(): Observable<IAutorizationData> {
    const userAuthData = this.getUserAuthData();

    if (userAuthData) {
      const { name, id  }= userAuthData;

      return of({id, name});
    }

    return this.http.post<any>(this.authUrl, {});
  }

  getData(): Observable<IReminderItem[]> {
    const userAuthData = this.getUserAuthData();
    let result = null;

    // Если id пользователя не найден, делаем запрос на получение id.
    if (!userAuthData) {
      result = this.getUserId()
      .pipe(
        tap(
          authData => {
            if (!authData.id) {
              return throwError("property 'id' can`t be empty");
            }
            this.myStorage.setItem('reminderUserAuthData', JSON.stringify(authData));
            this.getReminderList(authData.id);
        }),
        mergeMap(authData => {
          return this.getReminderList(authData.id);
        }),
        catchError(this.handleError('getUserId: ', []))
      );
    } else {
      result = this.getReminderList(userAuthData.id)
    }

    return result;
  }

  getReminderList(userId: string): Observable<IReminderItem[]> {
      const getReminderListUrl = `${this.baseUrl}/api/reminders?userId=${userId}`;

      return this.http.get<IReminderItem[]>(getReminderListUrl)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  toggleAll(event) {

  }

  toggleElem(id) {}

  hasCheckedElem(): boolean {
    return false;
  }

  isElemChecked(id): boolean {
    return false;
  }

  deleteAll() {}

  deleteSelected() {}

  addReminder(reminder) {

  }

  getUserAuthData() {
    const userAuthData = this.myStorage.getItem('reminderUserAuthData');
    const result = userAuthData ? JSON.parse(userAuthData) : null;

    return result;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  // private userId = this.myStorage.getItem('reminderAppUserId');
  // private reminderList = [];

  // async getUserId(): Promise<string> {
  //   let userId = this.myStorage.getItem('reminderAppUserId');

  //   if (userId) {
  //     this.http.post <IAutorizationData>(this.authUrl, {})
  //       .subscribe((res) => {
  //         userId = res.id;

  //         this.myStorage.setItem('reminderAppUserId', res.id)
  //       });
  //   }

  //   return userId;
  // }

  getUserId111(): Observable<IAutorizationData> {
    this.myStorage.removeItem('reminderAppUserId')
    let userId = this.myStorage.getItem('reminderAppUserId');

    console.log ('launch')

    if (!userId) {
      return this.http.post<any>(this.authUrl, {})
        .pipe(
          tap(_ => {
            this.myStorage.setItem('reminderAppUserId', _.id);

            return _.id;
          }),
        )
    }
  }

  getUserId(): Observable<IAutorizationData> {
    let id = this.myStorage.getItem('reminderAppUserId');
    let name = this.myStorage.getItem('reminderAppUserName');

    if (id) {
      return of({id, name});
    }

    return this.http.post<any>(this.authUrl, {});
  }

  getAll() {
    return this.getUserId()
      .pipe(
        tap(
          authData => {
            const id = this.myStorage.getItem('reminderAppUserId');

            if(!id) {
              this.myStorage.setItem('reminderAppUserId', authData.id);
              this.myStorage.setItem('reminderAppUserName', authData.name);
            }

            this.getReminderList(authData.id);
        }),
        mergeMap(authData => {
          return this.getReminderList(authData.id);
        })
      )
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
}

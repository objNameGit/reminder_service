import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, mergeMap, filter } from 'rxjs/operators';

import { IReminderItem } from '@src/interfaces/IReminderItem';
import { IAutorizationData } from '@src/interfaces/IAutorizationData';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'https://europe-west1-st-testcase.cloudfunctions.net';
  private authUrl = `${this.baseUrl}/api/auth`;
  private myStorage = localStorage;
  private readonly reminderList = new BehaviorSubject<IReminderItem[]>(this.getReminderListFromStore());
  private indeterminateStatus = new BehaviorSubject<boolean>(false);
  private checkedIdList = new BehaviorSubject<object>({});

  set state(newList:any) {
    const stubReminderList = this.myStorage.setItem('reminderList', JSON.stringify(newList));

    console.log ('set state =', newList);
    this.reminderList.next(newList);
  }

  get state() {
    const newList = this.reminderList.getValue();

    // console.log('new List = ', newList);
    return newList;
  }

  get state$() {
    return this.reminderList.asObservable();
  }

  set isIndeterminateActive(value: any) {
    this.indeterminateStatus.next(value);
  }

  get isIndeterminateActive() {
    return this.indeterminateStatus.getValue();
  }

  get isIndeterminateActive$() {
    return this.indeterminateStatus.asObservable();
  }

  set checkedItemList(value:any) {

    this.checkedIdList.next(value);
  }

  get checkedItemList() {
    return this.checkedIdList.getValue();
  }

  get checkedItemList$() {
    return this.checkedIdList.asObservable();
  }

  getStateChange() {
    return this.reminderList.asObservable();
  }

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

  toggleAll(event: object): void {
    const keys = Object.keys(this.checkedItemList);

    if (keys.length) {
      this.checkedItemList = {};
    } else {
      const newList = {};

      this.state.map((reminder: IReminderItem) => newList[reminder.id] = true);
      this.checkedItemList = newList;
    }
  }

  changeIndetermiateActive() {
    const checkedElemQuantity = Object.keys(this.checkedItemList).length;
    const reminderQuantity = this.state.length;

    this.isIndeterminateActive = checkedElemQuantity > 0 && checkedElemQuantity < reminderQuantity;
    console.log ('checkedElemQuantity = ', checkedElemQuantity);
    console.log ('reminderQuantity = ', reminderQuantity);
  }

  isCheckedActive() {
    const allElemChecked = Object.keys(this.checkedItemList).length === this.state.length;

    return allElemChecked;
  }

  toggleElem(id: string) {
    const isElemChecked = this.isElemChecked(id);
    const newObj = JSON.parse(JSON.stringify(this.checkedItemList));
    
    if (isElemChecked) {
      delete newObj[id];
    } else {
      newObj[id] = true
    }

    this.checkedItemList = newObj;
    console.log('TOGGLE newObj = ', newObj)
    console.log('TOGGLE newObj len = ', Object.keys(newObj).length)
    console.log('TOGGLE this.checkedItemList = ', Object.keys(this.checkedItemList).length)
    console.log('TOGGLE checkedItemList = ', this.checkedItemList)
  }



  isElemChecked(id: string): boolean {
    const result = id in this.checkedItemList;

    return result;
  }

  unselectedAll() {
    this.checkedItemList = {};
    // this.changeIndeterminateActive();
  }

  deleteSelected(): IReminderItem[] {
    const idList = Object.keys(this.checkedItemList);
    const curState = this.state;
    const needDeleteAll = idList.length === curState.length;

    if (needDeleteAll) {
      this.state = [];

      this.unselectedAll();
    } else {
      let newState = [];
  
      // Очищаем список выделенных элементов.
      idList.map((reminderId: string) => delete this.checkedItemList[reminderId]);
      
      // Получаем новое состояние.
      newState = curState.filter((reminder) => {
        const isNeedDelete = !idList.find((reminderId) => reminderId == reminder.id);

        return isNeedDelete;
      })

      this.state = newState;
    }

    return this.state;
  }

  deleteReminder(id: string) {
    const newState = this.state.filter((reminder: IReminderItem) => id !== reminder.id);

    this.state = newState;

    return this.state;
  }

  addReminder(reminder) {

  }

  getUserAuthData() {
    const userAuthData = this.myStorage.getItem('reminderUserAuthData');
    const result = userAuthData ? JSON.parse(userAuthData) : null;

    return result;
  }

/****************************************************************************** */
  // Удалить после того как заработает сервер
  stubAddUserToStorage() {
    const key = 'reminderUserAuthData';
    const userData = this.myStorage.getItem(key);

    if (!userData) {
      const userInfo = {
        id: 'dwf90fSD-0vo0vrk3wvlvdfsvXC',
        name: 'John Doe'
      }
  
      this.myStorage.setItem('reminderUserAuthData', JSON.stringify(userInfo));
    }
  }

  getReminderListFromStore() {
    const stubReminderList = this.myStorage.getItem('reminderList');
    const parseStubReminderList = stubReminderList ? JSON.parse(stubReminderList) : null;
    const result = parseStubReminderList || [];

    return result;
  }
}

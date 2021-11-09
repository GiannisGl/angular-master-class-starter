import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

interface EventBusArgs {
  eventType: string,
  data: any;
}

export const TITLE_CHANGE_EVENT_TYPE = 'appTitleChange';

@Injectable()
export class EventBusService {

  private _messages = new Subject<EventBusArgs>();

  emit(eventType: string, data: any) {
    this._messages.next({eventType, data});
  }

  observe(eventType: string): Observable<any> {
    return this._messages.asObservable()
      .pipe(
        filter(message => message.eventType === eventType),
        map(message => message.data)
      );
  }
}

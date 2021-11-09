import {Component, OnInit} from '@angular/core';
import {Contact} from './models/contact';
import {CONTACT_DATA} from './data/contact-data';
import {ContactsService} from './contacts.service';
import {EventBusService, TITLE_CHANGE_EVENT_TYPE} from './event-bus.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent {

  title$: Observable<string>;

  constructor(public eventBusService: EventBusService) {
    this.title$ = eventBusService.observe(TITLE_CHANGE_EVENT_TYPE);
  }
}

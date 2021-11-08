import {Component, OnInit} from '@angular/core';
import {Contact} from './models/contact';
import {CONTACT_DATA} from './data/contact-data';
import {ContactsService} from './contacts.service';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent {
  constructor() {}
}

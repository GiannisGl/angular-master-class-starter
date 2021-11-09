import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent {
  contacts$: Observable<Contact[]> = this.contactsService.getContacts();

  constructor(private contactsService: ContactsService) {
  }

  trackById(index: number, contact: Contact): string | number {
    return contact.id;
  }

  search(term: any): void {
    this.contacts$ = this.contactsService.search(term);
  }
}

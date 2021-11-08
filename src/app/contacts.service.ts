import { Injectable } from '@angular/core';
import {Contact} from './models/contact';
import {CONTACT_DATA} from './data/contact-data';

@Injectable()
export class ContactsService {

  getContacts(): Contact[] {
    return CONTACT_DATA;
  }

  getContact(id: number): Contact {
    return this.getContacts().find(contact => contact.id === id);
  }
}

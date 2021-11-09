import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent {
  contacts$: Observable<Contact[]> = this.contactsService.getContacts();
  private terms$: Subject<string> = new Subject<string>();

  constructor(private contactsService: ContactsService) {
    this.terms$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe((term: string) => this.searchList(term));
  }

  trackById(index: number, contact: Contact): string | number {
    return contact.id;
  }

  search(term: string) {
    this.terms$.next(term);
  }

  private searchList(term: string) {
    return this.contacts$ = this.contactsService.search(term);
  }
}

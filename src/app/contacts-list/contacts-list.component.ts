import {Component, OnInit} from '@angular/core';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  private terms$: Subject<string> = new Subject<string>();

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit(): void {
    const searchContacts$ = this.terms$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        switchMap((term: string) => this.searchList(term))
      );

    const allContacts$ = this.contactsService.getContacts()
      .pipe(
        delay(5000),
        takeUntil(searchContacts$)
      );

    this.contacts$ = merge(allContacts$, searchContacts$);
  }

  trackById(index: number, contact: Contact): string | number {
    return contact.id;
  }

  search(term: string) {
    this.terms$.next(term);
  }

  private searchList(term: string) {
    return this.contactsService.search(term);
  }
}

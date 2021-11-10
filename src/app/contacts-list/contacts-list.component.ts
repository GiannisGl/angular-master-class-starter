import {Component, OnInit} from '@angular/core';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';
import {CONTACTS_UPDATED_EVENT_TYPE, EventBusService, TITLE_CHANGE_EVENT_TYPE} from '../event-bus.service';
import {Router} from '@angular/router';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  private terms$: Subject<string> = new Subject<string>();

  constructor(private contactsService: ContactsService,
              private router: Router,
              private eventBusService: EventBusService) {
    eventBusService.emit(TITLE_CHANGE_EVENT_TYPE, '');
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
        takeUntil(searchContacts$)
      );

    const contactsUpdated$ = this.eventBusService.observe(CONTACTS_UPDATED_EVENT_TYPE).pipe(
      switchMap(() => this.searchList(''))
    )

    this.contacts$ = merge(allContacts$, searchContacts$, contactsUpdated$);
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

  delete(contact: Contact): void {
    this.contactsService.deleteContact(contact).subscribe(() => {
      this.eventBusService.emit(CONTACTS_UPDATED_EVENT_TYPE, '');
      if (this.router.url.includes(contact.id.toString())) {
        this.router.navigate(['contacts']);
      }
    });
  }
}

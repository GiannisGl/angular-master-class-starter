import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {EventBusService, TITLE_CHANGE_EVENT_TYPE} from '../event-bus.service';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-detail-view',
  templateUrl: './contacts-detail-view.component.html',
  styleUrls: ['./contacts-detail-view.component.scss']
})
export class ContactsDetailViewComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactsService: ContactsService,
              private eventBusService: EventBusService) {
    eventBusService.emit(TITLE_CHANGE_EVENT_TYPE, 'Contact Details');
  }

  ngOnInit(): void {
    this.contact$ = this.route.data.pipe(
      map(data => data['contact']),
      tap(contact => this.eventBusService.emit(TITLE_CHANGE_EVENT_TYPE, contact.name))
    );
  }

  navigateToEditor(contact: Contact) {
    return this.router.navigate(['contacts', contact.id, 'edit']);
  }

  navigateToList() {
    this.eventBusService.emit(TITLE_CHANGE_EVENT_TYPE, '');
    return this.router.navigate(['']);
  }
}

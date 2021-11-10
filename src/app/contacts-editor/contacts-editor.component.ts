import {Component, OnInit} from '@angular/core';
import {Contact} from '../models/contact';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {Observable} from 'rxjs';
import {EventBusService, TITLE_CHANGE_EVENT_TYPE} from '../event-bus.service';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.scss']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;
  warnOnClosing = true;

  constructor(private route: ActivatedRoute,
              private contactsService: ContactsService,
              private router: Router,
              private eventBusService: EventBusService) {
    eventBusService.emit(TITLE_CHANGE_EVENT_TYPE, 'Contact details editor');
  }

  ngOnInit(): void {
    this.contact$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => this.contactsService.getContact(id)),
      tap(contact => this.eventBusService.emit(TITLE_CHANGE_EVENT_TYPE, 'Editing: ' + contact.name))
    );
  }

  save(contact: Contact): void {
    this.contact$ = this.contactsService.updateContact(contact);
    this.warnOnClosing = false;
  }

  cancel(): Promise<boolean> {
    return this.router.navigate(['../'], {relativeTo: this.route});
  }
}

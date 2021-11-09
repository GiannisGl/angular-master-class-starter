import {Component, OnInit} from '@angular/core';
import {Contact} from '../models/contact';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {Observable} from 'rxjs';
import {EventBusService, TITLE_CHANGE_EVENT_TYPE} from '../event-bus.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.scss']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private route: ActivatedRoute,
              private contactsService: ContactsService,
              private router: Router,
              private eventBusService: EventBusService) {
    eventBusService.emit(TITLE_CHANGE_EVENT_TYPE, 'Contact details editor');
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.contact$ = this.contactsService.getContact(id).pipe(
      tap(contact => this.eventBusService.emit(TITLE_CHANGE_EVENT_TYPE, 'Editing Contact details: ' + contact.name)));
  }

  save(contact: Contact): void {
    this.contact$ = this.contactsService.updateContact(contact);
  }

  cancel(): Promise<boolean> {
    return this.router.navigate(['../'], {relativeTo: this.route});
  }
}

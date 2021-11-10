import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {CONTACTS_UPDATED_EVENT_TYPE, EventBusService} from '../event-bus.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'trm-contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.scss']
})
export class ContactsCreatorComponent implements OnInit {

  constructor(private contactsService: ContactsService,
              private route: ActivatedRoute,
              private router: Router,
              private eventBusService: EventBusService) { }

  ngOnInit(): void {
  }

  save(contact: Contact): void {
    this.contactsService.addContact(contact).subscribe((newContact: Contact) => {
      this.eventBusService.emit(CONTACTS_UPDATED_EVENT_TYPE, '');
      this.router.navigate(['contacts', newContact.id]);
    });
  }

  close(): Promise<boolean> {
    return this.router.navigate(['../'], {relativeTo: this.route});
  }
}

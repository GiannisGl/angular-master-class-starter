import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../models/contact';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.scss']
})
export class ContactsDetailComponent {
  @Input() contact: Contact;
  @Output() edit: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
}

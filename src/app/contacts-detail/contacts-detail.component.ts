import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../models/contact';
import {Observable} from 'rxjs';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.scss']
})
export class ContactsDetailComponent {
  @Input() contact$: Observable<Contact>;
  @Output() edit: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
}

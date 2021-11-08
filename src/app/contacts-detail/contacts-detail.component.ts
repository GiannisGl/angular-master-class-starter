import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../contacts.service';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.scss']
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact;

  constructor(private route: ActivatedRoute, private contactsService: ContactsService) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.contactsService.getContact(id).subscribe((contact: Contact) => this.contact = contact);
  }

}

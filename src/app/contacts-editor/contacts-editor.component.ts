import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../contacts.service';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.scss']
})
export class ContactsEditorComponent implements OnInit {

  contact: Contact;

  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private router: Router) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.contactsService.getContact(id).subscribe((contact: Contact) => this.contact = contact);
  }

  save(contact: Contact): void {
    this.contactsService.updateContact(contact).subscribe();
  }

  cancel(): Promise<boolean> {
    return this.router.navigate(['../'], {relativeTo: this.route});
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';

@Component({
  selector: 'trm-contacts-detail-view',
  templateUrl: './contacts-detail-view.component.html',
  styleUrls: ['./contacts-detail-view.component.scss']
})
export class ContactsDetailViewComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private router: Router, private route: ActivatedRoute, private contactsService: ContactsService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.contact$ = this.contactsService.getContact(id);
  }

  navigateToEditor(contact: Contact) {
    return this.router.navigate(['contact', contact.id, 'edit']);
  }

  navigateToList() {
    return this.router.navigate(['list']);
  }
}

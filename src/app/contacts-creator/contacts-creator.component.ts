import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {CONTACTS_UPDATED_EVENT_TYPE, EventBusService} from '../event-bus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {checkEmailAvailability} from '../email-availability-validator.directive';
import {validateEmail} from '../email-validator.directive';

@Component({
  selector: 'trm-contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.scss']
})
export class ContactsCreatorComponent implements OnInit {

  form: FormGroup;
  phoneFormArray = this.formBuilder.array([this.formBuilder.control('')]);

  constructor(private contactsService: ContactsService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control('', validateEmail, checkEmailAvailability(this.contactsService)),
      birthday: '',
      phone: this.phoneFormArray,
      website: '',
      gender: '',
      address: this.formBuilder.group({
        street: '',
        zip: '',
        city: '',
        country: ''
      })
    });
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

  addPhoneField(): void {
    this.phoneFormArray.push(this.formBuilder.control(''));
  }

  removePhoneField(i: number) {
    this.phoneFormArray.removeAt(i);
  }
}

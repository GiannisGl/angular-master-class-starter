import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Contact} from '../models/contact';
import {Observable} from 'rxjs';
import {ContactsService} from '../contacts.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ContactsResolver implements Resolve<Contact> {

  constructor(private contactService: ContactsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Contact> | Promise<Contact> | Contact {
    return this.contactService.getContact(route.params.id);
  }
}

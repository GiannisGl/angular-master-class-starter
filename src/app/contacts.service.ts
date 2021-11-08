import {Inject, Injectable} from '@angular/core';
import {Contact} from './models/contact';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {API_ENDPOINT} from './app.tokens';

interface ContactResponse {
  item: Contact;
}

interface ContactsResponse {
  items: Contact[];
}


@Injectable()
export class ContactsService {

  readonly CONTACTS_ENDPOINT = 'contacts';

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiUrl: string) {
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<ContactsResponse>(`${this.apiUrl}/${this.CONTACTS_ENDPOINT}`).pipe(map(data => data.items));
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<ContactResponse>(`${this.apiUrl}/${this.CONTACTS_ENDPOINT}/${id}`).pipe(map(data => data.item));
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<ContactResponse>(`${this.apiUrl}/${this.CONTACTS_ENDPOINT}/${contact.id}`, contact).pipe(map(data => data.item));
  }
}

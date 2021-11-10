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

  getContact(id: string): Observable<Contact> {
    return this.http.get<ContactResponse>(`${this.apiUrl}/${this.CONTACTS_ENDPOINT}/${id}`).pipe(map(data => data.item));
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<ContactResponse>(`${this.apiUrl}/${this.CONTACTS_ENDPOINT}/${contact.id}`, contact).pipe(map(data => data.item));
  }

  search(term: string): Observable<Contact[]> {
    return this.http.get<ContactsResponse>(`${this.apiUrl}/search?text=${term}`).pipe(map(data => data.items));
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<ContactResponse>(`${this.apiUrl}/${this.CONTACTS_ENDPOINT}`, contact).pipe(map(data => data.item));
  }

  deleteContact(contact: Contact): Observable<Contact> {
    return this.http.delete<ContactResponse>(`${this.apiUrl}/${this.CONTACTS_ENDPOINT}/${contact.id}`).pipe(map(data => data.item));
  }

  isEmailAvailable(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/check-email?email=${email}`);
  }
}

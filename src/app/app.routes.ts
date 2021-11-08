import {Route} from '@angular/router';
import {ContactsListComponent} from './contacts-list/contacts-list.component';
import {ContactsDetailComponent} from './contacts-detail/contacts-detail.component';
import {ContactsEditorComponent} from './contacts-editor/contacts-editor.component';

export const APP_ROUTES: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {path: 'list', component: ContactsListComponent},
  {path: 'contact/:id', component: ContactsDetailComponent},
  {path: 'contact/:id/edit', component: ContactsEditorComponent},
];

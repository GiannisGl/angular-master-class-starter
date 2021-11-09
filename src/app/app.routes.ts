import {Route} from '@angular/router';
import {ContactsListComponent} from './contacts-list/contacts-list.component';
import {ContactsEditorComponent} from './contacts-editor/contacts-editor.component';
import {ContactsDetailViewComponent} from './contacts-detail-view/contacts-detail-view.component';

export const APP_ROUTES: Route[] = [
  {path: 'list', component: ContactsListComponent},
  {path: 'contact/:id', component: ContactsDetailViewComponent},
  {path: 'contact/:id/edit', component: ContactsEditorComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'list'},
];

import {Route} from '@angular/router';
import {ContactsEditorComponent} from './contacts-editor/contacts-editor.component';
import {ContactsDetailViewComponent} from './contacts-detail-view/contacts-detail-view.component';
import {ContactsDashboardComponent} from './contacts-dashboard/contacts-dashboard.component';
import {AboutComponent} from './about/about.component';

export const APP_ROUTES: Route[] = [
  {
    path: 'contacts',
    component: ContactsDashboardComponent,
    children: [
      {path: ':id', component: ContactsDetailViewComponent},
      {path: ':id/edit', component: ContactsEditorComponent},
    ]
  },
  {path: 'about', component: AboutComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'contacts'},
];

import {Route} from '@angular/router';
import {ContactsEditorComponent} from './contacts-editor/contacts-editor.component';
import {ContactsDetailViewComponent} from './contacts-detail-view/contacts-detail-view.component';
import {ContactsDashboardComponent} from './contacts-dashboard/contacts-dashboard.component';
import {AboutComponent} from './about/about.component';
import {CAN_DEACTIVATE_GUARD} from './app.tokens';
import {ContactsResolver} from './shared/contacts.resolver';
import {AboutModule} from './about/about.module';

export const APP_ROUTES: Route[] = [
  {
    path: 'contacts',
    component: ContactsDashboardComponent,
    children: [
      {
        path: ':id',
        component: ContactsDetailViewComponent,
        resolve: {
          contact: ContactsResolver
        }
      },
      {
        path: ':id/edit',
        component: ContactsEditorComponent,
        canDeactivate: [CAN_DEACTIVATE_GUARD],
        resolve: {
          contact: ContactsResolver
        }},
    ]
  },
  {path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  {path: '**', pathMatch: 'full', redirectTo: 'contacts'},
];

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContactsMaterialModule} from './contacts-material.module';

import {ContactsAppComponent} from './app.component';
import {ContactsService} from './contacts.service';
import {ContactsListComponent} from './contacts-list/contacts-list.component';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {ContactsDetailComponent} from './contacts-detail/contacts-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {API_ENDPOINT, CAN_DEACTIVATE_GUARD} from './app.tokens';
import {ContactsEditorComponent} from './contacts-editor/contacts-editor.component';
import {FormsModule} from '@angular/forms';
import {ContactsDetailViewComponent} from './contacts-detail-view/contacts-detail-view.component';
import { TabsComponent } from './tabs/tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import {EventBusService} from './event-bus.service';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { AboutComponent } from './about/about.component';
import {ContactsResolver} from './shared/contacts.resolver';

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactsEditorComponent,
    ContactsDetailViewComponent,
    TabsComponent,
    TabComponent,
    ContactsDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContactsMaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ContactsService,
    EventBusService,
    ContactsResolver,
    {provide: API_ENDPOINT, useValue: 'http://localhost:4201/api'},
    {provide: CAN_DEACTIVATE_GUARD, useValue: confirmNavigationGuard}
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}

// Needs to be an exported function for AOT to work
export function confirmNavigationGuard(component): boolean {
  return !component.warnOnClosing || window.confirm('Navigate away without saving?');
}

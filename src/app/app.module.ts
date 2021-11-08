import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactsMaterialModule } from './contacts-material.module';

import { ContactsAppComponent } from './app.component';
import {ContactsService} from './contacts.service';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';


@NgModule({
  declarations: [ContactsAppComponent, ContactsListComponent, ContactsDetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContactsMaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    ContactsService
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}

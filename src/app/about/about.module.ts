import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AboutComponent} from './about.component';
import {ContactsMaterialModule} from '../contacts-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: AboutComponent}
    ]),
    ContactsMaterialModule,
    FlexLayoutModule
  ]
})
export class AboutModule { }

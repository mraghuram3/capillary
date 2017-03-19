import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { GaurdService } from './service/gaurd.service';
import { AuthService } from './service/auth.service';
import { BackendService } from './service/backend.service';

import {Ng2PaginationModule} from 'ng2-pagination';

import { DropdownModule, TypeaheadModule   } from 'ng2-bootstrap';

import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  AppRoutingModule, Ng2PaginationModule, DropdownModule.forRoot(), TypeaheadModule.forRoot(), SlimLoadingBarModule],
  providers: [GaurdService, AuthService, BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }

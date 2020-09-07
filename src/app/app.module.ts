import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Router, ActivatedRoute, ParamMap, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { LoginService } from './services/login.service';
import { RegistryService } from './services/registry.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentService } from './services/appointment.service';
import { NewappointmentComponent } from './newappointment/newappointment.component';
import { ProfileComponent } from './profile/profile.component';
import { AreasService } from './services/areas.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    DashboardComponent,
    NewappointmentComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule    
  ],
  providers: [LoginService,RegistryService,AppointmentService,AreasService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistryComponent } from './registry/registry.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewappointmentComponent } from './newappointment/newappointment.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registry', component: RegistryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'new/:id', component: NewappointmentComponent },
  { path: 'profile/:id', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
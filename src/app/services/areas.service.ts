import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppointmentArea } from '../models/appointmentarea';
import { IAppointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  URL = "https://localhost:44336/api/areas"
  constructor(private httpClient: HttpClient) { }

  getAreas():Observable<IAppointmentArea[]>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept','application/json');
    return this.httpClient.get<IAppointmentArea[]>(this.URL,{headers:headers} );
  }

}

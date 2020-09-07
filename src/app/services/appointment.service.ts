import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppointment } from '../models/appointment';
import { IAppointmentArea } from '../models/appointmentarea';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  URL = "https://localhost:44336/api/appointments"

  constructor(private httpClient: HttpClient) { }

  getPatientAppointments(patiendId):Observable<IAppointment[]>{
    // Setup log namespace query parameter
    let params = new HttpParams().set('id', patiendId);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept','application/json');
    return this.httpClient.get<IAppointment[]>(this.URL,{ params: params, headers: headers})
  }

  cancelAppointment(appointementID):Observable<any>{
    let params = new HttpParams().set('id', appointementID);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept','application/json');
      return this.httpClient.delete(this.URL, { params: params, headers:headers})
  }

  createAppointment(_pApp: IAppointment):Observable<any>{
    return this.httpClient.post(this.URL,_pApp,{observe : 'response'});
  }
}

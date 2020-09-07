import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  URL = "https://localhost:44336/api/patient"

  constructor(private httpClient: HttpClient) { }

  getPatientDetails(id):Promise<IPatient>{
    let params = new HttpParams().set('id', id);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept','application/json');
    return this.httpClient.get<IPatient>(this.URL,{params:params, headers:headers}).toPromise();
  }

}

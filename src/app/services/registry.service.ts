import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPatient } from '../models/patient';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class RegistryService {

  URL = "https://localhost:44336/api/patient";

  constructor(private httpClient: HttpClient) {     
  }

  registerPatient(patient: IPatient): Observable<any>{
    return this.httpClient.post(this.URL,patient,{observe : 'response'});
  }

}

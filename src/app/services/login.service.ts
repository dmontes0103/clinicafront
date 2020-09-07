import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../models/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = "https://localhost:44336/api/login";  
  TOKEN = null;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  authenticatePatient(_login: ILogin):Observable<any>{
    return this.httpClient.post(this.URL,_login,{observe : 'response'});
  }

  isAuthenticated(){
    return this.TOKEN == null ? false : true;
  }

  logOut(){
    this.TOKEN = null;
    console.log(this.TOKEN);
    this.router.navigate(['login']);
  }

  logIn(token){
    this.TOKEN = token;
  }

}

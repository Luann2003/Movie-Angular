import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = signal(environment.apiUrl)

  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string){
    
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('myclientid:myclientsecret') // Codifica client_id e client_secret
    });

    return this.httpClient.post<LoginResponse>(this.url() + "/oauth2/token", body.toString(), {headers}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.access_token)
      })
    )


  }
}

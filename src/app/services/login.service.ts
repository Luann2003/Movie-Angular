import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginResponse } from '../types/loginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

  url = signal(environment.apiUrl)

  constructor(
    private route: Router,
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

    this.authStatus.next(true);

    return this.httpClient.post<LoginResponse>(this.url() + "/oauth2/token", body.toString(), {headers}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.access_token)
      })
    )
  }

  getAuthStatus() {
    return this.authStatus.asObservable(); // Retorna um observable do estado de autenticação
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('auth-token');
  }

  logout() {
    sessionStorage.removeItem('auth-token');
    this.authStatus.next(false)
    this.route.navigate(['']);
  }

}

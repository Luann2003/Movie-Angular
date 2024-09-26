import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Ireviews } from '../interfaces/Ireviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url = signal(environment.apiUrl)

  constructor(
    private httpClient: HttpClient
  ) { }

  getReviewsId(id: number): Observable<any>{

    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
    });

    return this.httpClient.get<{ content: any[] }>(this.url() + `/movies/${id}/reviews`, {headers});

  }

  postReview(form: any): Observable<Ireviews> {
    const token = sessionStorage.getItem('auth-token');
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
    });
  
    // Passar os headers no terceiro parâmetro
    return this.httpClient.post<Ireviews>(`${this.url()}/reviews`, form, { headers });
  }
  

}


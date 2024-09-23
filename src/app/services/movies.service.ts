import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  url = signal(environment.apiUrl)


  constructor(private httpClient: HttpClient) { }

  getGenre(): Observable<{ content: any[] }> {

    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
    });

    return this.httpClient.get<{ content: any[] }>(this.url() + "/genres", {headers}) 
  }
  

  getMoviesByGenre(genreId: string, page: number, size: number): Observable<{ content: any[] }> {

    const token = sessionStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
    });

    const url = `${this.url()}/movies?genreId=${genreId}&page=${page}&size=${size}`;


    return this.httpClient.get<{ content: any[] }>(url, {headers});
  }


}

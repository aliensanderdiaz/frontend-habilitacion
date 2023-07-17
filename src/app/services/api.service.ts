import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  peticionGet(url: string) {
    const url_peticion = `${ this.urlApi }/${ url }`

    return this.http.get( url_peticion )
  }

  peticionPost(url: string, data: any) {
    const url_peticion = `${ this.urlApi }/${ url }`

    return this.http.post( url_peticion, data )
  }
}

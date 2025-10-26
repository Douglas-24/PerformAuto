import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../core/environments/environments';
import { Observable } from 'rxjs';

interface credentials {
    email: string,
    dni ?: string,
    password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private url = environments.urlApi + 'auth/'


  login(credentials: credentials){
    this.http.post(this.url+'login', credentials).subscribe(token => {
      console.log(token);
      
    })
  }
}

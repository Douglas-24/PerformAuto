import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { User } from '../interfaces/user.interfaces';
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


  login(credentials: credentials):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url+'login', credentials)
  }

  register(dataUser: User):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url+'register', dataUser)
  }

  getProfile():Observable<{user: User}>{
    return this.http.get<{user: User}>(this.url+'profile')
  }


  isLogged():boolean{
    return localStorage.getItem('token') ? true : false
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { User, UserRegister } from '../interfaces/user.interfaces';
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

  register(dataUser: User | UserRegister):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url+'register', dataUser)
  }

  getProfile():Observable<{user: User}>{
    return this.http.get<{user: User}>(this.url+'profile')
  }

  verifyAccount(token:string):Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url +'verify?token=' +token)
  }

  forgotPass(email:{email:string}):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url+'forgotPass',email)
  }

  recoverPass(dataRecover: {token:string, newPassword:string}):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url+'recoverPass', dataRecover)
  }

  isLogged():boolean{
    return localStorage.getItem('token') ? true : false
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { User } from '../interfaces/user.interfaces';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  private url = environments.urlApi + 'user/'

  getAllUser():Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url)
  }

  getAllClient():Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url + 'getClient')
  }

  postUser(user:User):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url,user)
  }

  updateUser(user:User):Observable<apiReponse>{
    return this.http.put<apiReponse>(this.url + user.id, user )
  }

  delateUser(user:User):Observable<apiReponse>{
    return this.http.delete<apiReponse>(this.url + user.id)
  }

}

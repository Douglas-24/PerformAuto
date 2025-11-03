import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  private url = environments.urlApi + 'user/'

  getAllUser():Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url)
  }
}

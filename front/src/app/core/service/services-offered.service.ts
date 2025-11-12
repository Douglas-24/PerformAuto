import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';

@Injectable({
  providedIn: 'root'
})
export class ServicesOffered {
  private http = inject(HttpClient)  
  private url = environments.urlApi + 'type-service/'

  getAllServices():Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url)
  }
}

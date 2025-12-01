import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { Parts } from '../interfaces/parts.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
    private http = inject(HttpClient)
    private url = environments.urlApi + 'parts/'

    getAllParts():Observable<apiReponse>{
      return this.http.get<apiReponse>(this.url)
    }

    getPart(id:number):Observable<apiReponse>{
      return this.http.get<apiReponse>(this.url + id)
    }

    updatePart(id:number, updatePart:Parts):Observable<apiReponse>{
      return this.http.patch<apiReponse>(this.url + id,updatePart)
    }
    deletePart(id:number):Observable<apiReponse>{
      return this.http.delete<apiReponse>(this.url + id)
    }
    postPart(part:Parts):Observable<apiReponse>{
      return this.http.post<apiReponse>(this.url, part)
    }
}
